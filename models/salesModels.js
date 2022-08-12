const connection = require('./connection');

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
};
