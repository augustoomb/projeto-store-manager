const salesModel = require('../models/salesModels');
const salesProductModel = require('../models/salesProductsModel');

const salesValidations = require('../utils/salesValidations');

const {
  checkProductId, checkQuantity, checkQuantityIsGreaterThanZero, checkProductsExistsInDb,
} = salesValidations;

// usado apenas para montar o retorno da função create;
function mountReturn(salesProduct, id) {
  return {
    id,
    itemsSold: salesProduct,
  };
}

const getAll = async () => salesModel.getlAll();

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (sale.length === 0) {
    return {
      error: {
        status: 404,
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const create = async (arrSalesProd) => {
  const productIdIsError = checkProductId(arrSalesProd);
  const quantityIsError = checkQuantity(arrSalesProd);
  const sizeIsError = checkQuantityIsGreaterThanZero(arrSalesProd);  

  if (productIdIsError.error) return productIdIsError;
  if (quantityIsError.error) return quantityIsError;
  if (sizeIsError.error) return sizeIsError;

  const productIdExistsIsError = await checkProductsExistsInDb(arrSalesProd);
  if (productIdExistsIsError.error) return productIdExistsIsError;

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
  getAll,
  getById,
};
