const productsModel = require('../models/productsModels');
const productValidations = require('../utils/productsValidation');
const errorsCreator = require('../utils/errorsCreator');

const { schemaName, schemaId } = productValidations;
const { mountObjErrorJoi, mountObjError } = errorsCreator;

const getAll = async () => productsModel.getAll();

const productExists = async (id) => {
  const arrBooleansProdExists = await productsModel.productExists(id);
  return arrBooleansProdExists; // 0 não existe, 1 existe
};

const getById = async (id) => {
  const errorId = schemaId.validate({ id }); // validando o id
  if (errorId.error) { return mountObjErrorJoi(errorId); }

  const product = await productsModel.getById(id);

  if (!product) {
    return mountObjError(404, 'Product not found');
  }
  return product;
};

const searchByTerm = async (term) => {
  const products = await productsModel.searchByTerm(term);

  return products;
};

const create = async (name) => {
  const errorName = schemaName.validate({ name }); // validando o nome com join
  if (errorName.error) { return mountObjErrorJoi(errorName); }

  return productsModel.create(name);
};

const update = async (id, name) => {  
  const errorName = schemaName.validate({ name }); // validando o nome com join

  if (errorName.error) { return mountObjErrorJoi(errorName); } // se o nome informado tiver erro

  const idExistsInDb = await productsModel.productExists(id); // checando se prod existe no banco (pelo id)

  if (idExistsInDb.prodExists === 0) { // se o banco não encontrar, retorna 0
    return mountObjError(404, 'Product not found');
  }

  return productsModel.update(id, name);
};

const deleteProduct = async (id) => {
  const errorId = schemaId.validate({ id }); // validando o id
  if (errorId.error) { return mountObjErrorJoi(errorId); }

  const idExistsInDb = await productsModel.productExists(id); // checando se prod existe no banco (pelo id)

  if (idExistsInDb.prodExists === 0) { // se o banco não encontrar, retorna 0
    return mountObjError(404, 'Product not found');
  }

  return productsModel.deleteProduct(id);
};

module.exports = { getAll, getById, searchByTerm, create, productExists, update, deleteProduct };
