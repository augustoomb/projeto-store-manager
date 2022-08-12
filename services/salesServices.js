const salesModel = require('../models/salesModels');
const salesProductModel = require('../models/salesProductsModel');

const create = async (productId, quantity) => {
  const { saleId } = await salesModel.create();

  const salesProduct = await salesProductModel.create(saleId, productId, quantity);

  return salesProduct;
};

module.exports = {
  create,
};
