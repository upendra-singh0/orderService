import { query } from '../db';
import ServiceError from '../util/ServiceError';

const insertOrderQuery = `
INSERT INTO order_table (user_id, order_detail) VALUES ($2, $1);
`;

/**
 * Creates order
 * @param {object} products - products which are meant to be ordered
 * @param {object} userId - user ordering the products
 * @returns {bool} status - whether the object created or not
 */

const create = async ({ products, userId }) => {
  try {
    await query(insertOrderQuery, [JSON.stringify(products), userId]);
    return true;
  } catch (error) {
    // throw error;
    console.log(error);
    throw new ServiceError({ message: 'Internal Service Error', status: 500 });
  }
};

export { create };
