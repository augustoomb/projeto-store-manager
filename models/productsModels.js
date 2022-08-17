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

const searchByTerm = async (term) => {
  const [result] = await connection.execute(
    // `SELECT id, name FROM StoreManager.products WHERE id = ${id}`,
    `SELECT id, name FROM StoreManager.products WHERE name LIKE '%${term}%'`,
  );

  return result;
};

const productExists = async (id) => {
  const [result] = await connection.execute(
    `SELECT EXISTS(SELECT id FROM StoreManager.products WHERE id = ${id}) AS prodExists`,
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

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=(?) WHERE id = (?)',
    [name, id],
  );

  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
  );

  return {};
};

module.exports = { getAll, getById, searchByTerm, create, productExists, update, deleteProduct };
