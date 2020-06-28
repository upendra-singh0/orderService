import { create as createOrder } from '../services/OrderService';
import { update as updateInventory } from '../services/InventoryService';
import ServiceError from '../util/ServiceError';

/**
 * Creates order
 * @param {object} products - products which are meant to be ordered
 * @param {object} userId - user ordering the products
 * @returns {void}
 */

const create = async ({ userId, products }) => {
  // Create Order, after validating products and user
  // Check if inventory has sufficient stock. If yes, then update the inventory
  const isInventoryUpdated = await updateInventory({
    products,
  });
  if (!isInventoryUpdated) {
    throw new ServiceError({
      message: 'Few products have been sold out!, request cannot be processed',
      status: 400,
    });
  }
  await createOrder({
    products,
    userId,
  });
  return;
};

export { create };
