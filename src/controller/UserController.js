import { get as getUser } from '../services/UserService';

/**
 * Get User
 * @param {number} id - products needs to be updated in inventory
 * @returns {object} user - details regarding the user
 */

const get = async ({ id }) => {
  const user = await getUser({ id });
  return user;
};

export { get };
