# Order Service

### Building

=> Move .example.env to .env and fill the environment variables used
=> Seed database (see ./seedData.sql)

After that run following commands in sequence

```
cd ./order-service
npm install
npm run dev-start
```

doubt:
1.validator.js joi can be used or not, how to reach to conclusion that promise will be used here, resolve?
2.inventoryservice.js PRODUCT_SUB_QUERY_BLOCK idea and reason behind this approach
3.OrderService.js how to add descriptive comment

4. app.listen(PORT, '0.0.0.0', () => {
   console.log(`Listings service listening on PORT = ${PORT}`);
   });

js-doc, swagger-js-doc

express-validator