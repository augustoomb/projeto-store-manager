const connection = require('./connection');

const getlAll = async () => {
  const [result] = await connection.execute(
    `SELECT SP.sale_id AS saleId, S.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id;`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT S.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id
    WHERE S.id = ${id};`,
  );

  return result;
};

const create = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  return {
    saleId: sale.insertId,
  };
};

module.exports = {
  create,
  getlAll,
  getById,
};
