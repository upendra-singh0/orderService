import { Router } from 'express';
import { create as createOrder } from '../controller/OrderController';
import { get as getUser } from '../controller/UserController';
import ServiceError from '../util/ServiceError';
import { validateProducts } from '../util/validators';
import processRequest from '../util/processRequest';

const router = Router();

/**
 * Create an order.
 *
 * @route {POST} /api/order/:userId
 * @routeparam {number} :userId is the unique identifier for the user, who is creating the order.
 * @bodyparam {object} products is the order to create.
 */
router.post('/:userId', async (req, res, next) => {
  try {
    const { data, pathParams } = processRequest(req);
    const { userId } = pathParams;
    const { products } = data;

    // Validate Product details (*can be santized also*)
    const isProductValidated = await validateProducts(products);
    if (!isProductValidated) {
      throw new ServiceError({ message: 'Product details are not valid', status: 400 });
    }

    // Validate User
    const user = await getUser({ id: userId });
    if (!user) {
      throw new ServiceError({ message: 'User not found', status: 400 });
    }

    await createOrder({ userId, products });
    return res.json({ message: 'Created Order Successfully' }).status(200);
  } catch (err) {
    return next(err);
  }
});

export default router;
