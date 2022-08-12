const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT id, name FROM StoreManager.products ORDER BY id',
  );
  
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT id, name FROM StoreManager.products WHERE id = ${id}`,
  );

  return result[0];
};

const create = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return { id: product.insertId, name };
};

module.exports = { getAll, getById, create };
