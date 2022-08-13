const salesModel = require('../models/salesModels');
const salesProductModel = require('../models/salesProductsModel');

const salesValidations = require('../utils/salesValidations');

const {
  checkProductId, checkQuantity, checkQuantityIsGreaterThanZero, checkProductsExistsInDb,
} = salesValidations;

function mountReturn(salesProduct, id) {
  return {
    id,
    itemsSold: salesProduct,
  };
}

const create = async (arrSalesProd) => {
  const productIdIsError = checkProductId(arrSalesProd);
  const quantityIsError = checkQuantity(arrSalesProd);
  const sizeIsError = checkQuantityIsGreaterThanZero(arrSalesProd);
  const productIdExistsIsError = await checkProductsExistsInDb(arrSalesProd);

  if (productIdIsError.error) return productIdIsError;
  if (quantityIsError.error) return quantityIsError;
  if (sizeIsError.error) return sizeIsError;
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
};
