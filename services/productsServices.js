const productsModel = require('../models/productsModels');

const getAll = async () => productsModel.getAll();

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

module.exports = { getAll, getById };
