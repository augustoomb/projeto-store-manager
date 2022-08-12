const salesModel = require('../models/salesModels');
const salesProductModel = require('../models/salesProductsModel');

function mountReturn(salesProduct, id) {
  return {
    id,
    itemsSold: salesProduct,
  };
}

const create = async (arrSalesProd) => {
  const { saleId } = await salesModel.create();

  const salesProduct = await Promise.all(
    arrSalesProd.map((salesProd) => salesProductModel.create(
      saleId, salesProd.productId, salesProd.quantity,
    )),
  );

  const obj = mountReturn(salesProduct, saleId);

  return obj;
};

module.exports = {
  create,
};
