import OrdersRoute from './OrdersRoute';

const setupRoutes = (app) => {
  app.use('/api/order', OrdersRoute);
};

export default setupRoutes;
