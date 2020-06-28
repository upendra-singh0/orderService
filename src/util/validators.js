/**
 * Validate Products
 * @param {Array} products - products to be validated
 * @returns {bool}
 */
const validateProducts = async (products) => {
  return new Promise((resolve) => {
    if (!Array.isArray(products)) resolve(false);
    // This can be improved,
    // Enums can be used instead of hardcoding it here, because in future this can changed
    const properties = ['product_id', 'qty'];
    products.forEach((product) => {
      properties.forEach((property) => {
        if (
          !(
            Object.prototype.hasOwnProperty.call(product, property) &&
            Number.isInteger(product[property])
          )
        ) {
          resolve(false);
        }
      });
    });
    resolve(true);
  });
};

export { validateProducts };
