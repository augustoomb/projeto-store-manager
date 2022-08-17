const connection = require('./connection');

const create = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return {
    // id: saleId,
    productId,
    quantity,
  };
};

const update = async (saleId, productId, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ? WHERE (sale_id = ? AND product_id = ?)`,
    [productId, quantity, saleId, productId],
  );

  return {
    productId,
    quantity,
  };
};

// const saleExists = async (saleId, productId) => {
//   const [result] = await connection.execute(
//     `SELECT EXISTS(SELECT * FROM StoreManager.sales_products
//       WHERE (sale_id = ${saleId} AND product_id = ${productId}))  AS saleExists`,
//   );

//   return result[0];
// };

const saleIdExists = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT EXISTS(SELECT * FROM StoreManager.sales_products
      WHERE sale_id = ${saleId})  AS saleExists`,
  );

  return result[0];
};

const prodIdExists = async (productId) => {
  const [result] = await connection.execute(
    `SELECT EXISTS(SELECT * FROM StoreManager.sales_products
      WHERE product_id = ${productId})  AS saleExists`,
  );

  return result[0];
};

module.exports = {
  create,
  update,
  saleIdExists,
  prodIdExists,
};
