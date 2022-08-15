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

module.exports = { getAll, getById, create, productExists, update };

// ESTRUTURA QUE O UPDATE DEVOLVE, APENAS PARA CONSULTA:

/*

// No caso de um update ser consumado de fato:

ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}

// No caso de uma tentativa de update válido, mas com os mesmos dados fornecidos acima...
// ... isso quer dizer que não vai dar erro, mas o banco também não vai atualizar
// (observar o abaixo o "Changed: 0", enquanto acima, é "Changed: 1")

ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}

*/
