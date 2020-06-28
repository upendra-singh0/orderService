import { getClient } from '../db';
import ServiceError from '../util/ServiceError';

// Query Explanation:
// It creates a sub query block for the product object (*Rows to be modified*),
// transformed json input to recordset
const PRODUCT_SUB_QUERY_BLOCK = `
WITH modified_rows (product_id, qty, updated_at) AS (
SELECT *, now() as updated_at
FROM json_to_recordset($1)
AS x(product_id int, qty int)
)`;

// Query Explanation:
// Locks the rows to handle concurrency issue,
// returns product which are eligible to purchase (*Inventory has enough stock to buy*)
const lockProductsToUpdateQuery = `
${PRODUCT_SUB_QUERY_BLOCK}
SELECT * FROM inventory_table i, modified_rows m 
WHERE i.product_id = m.product_id and i.product_quantity >= m.qty FOR UPDATE;
`;

// Query Explanation:
// Updates product in Inventory table,
// It decrements the count of qty as per the bought quantity
const updateInventoryQuery = `
${PRODUCT_SUB_QUERY_BLOCK}
UPDATE inventory_table i
SET product_quantity = i.product_quantity - m.qty, updated_at = m.updated_at
FROM modified_rows m
WHERE i.product_id = m.product_id
RETURNING *;
`;

/**
 * Update Inventory
 * @param {object} products - products needs to be updated in inventory
 * @returns {bool} status - whether the inventory updated or not
 */

const update = async ({ products }) => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await getClient();
  const params = [JSON.stringify(products)];

  try {
    // Begin a transaction to create an order
    await client.query('BEGIN');

    // Lock the inventory items (rows) before processing towards the update
    const { rows: eligibleProducts } = await client.query(lockProductsToUpdateQuery, params);

    // If there is enough stock to purchase for each product,
    // Update the inventory_table and return true
    // else return false
    if (products.length === eligibleProducts.length) {
      const { rows: updatedProducts } = await client.query(updateInventoryQuery, params);
      console.log(updatedProducts);
      await client.query('COMMIT');
      return true;
    }
    await client.query('COMMIT');
    return false;
  } catch (error) {
    await client.query('ROLLBACK');
    // throw error;
    console.log(error);
    throw new ServiceError({ message: 'Internal Service Error', status: 500 });
  } finally {
    // Releases an acquired client back to the pool.
    client.release();
  }
};

export { update };
