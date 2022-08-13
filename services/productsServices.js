const productsModel = require('../models/productsModels');

const getAll = async () => productsModel.getAll();

const productExists = async (id) => {
  const arrBooleansProdExists = await productsModel.productExists(id);
  return arrBooleansProdExists;
};

const getById = async (id) => {
  if (!id || !Number.isInteger(Number(id))) {
    return {
      error: {
        status: 404,
        message: 'ID inválido',
      },
    };
  }

  const product = await productsModel.getById(id);

  if (!product) {
    return {
      error: {
        status: 404,
        message: 'Product not found',
      },
    };
  }

  return product;
};

const create = async (name) => {
  if (name === undefined) {
    return {
      error: {
        status: 400,
        message: '"name" is required',
      },
    };
  }

  if (name.length < 5) {
    return {
      error: {
        status: 422,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  return productsModel.create(name);
};

module.exports = { getAll, getById, create, productExists };
