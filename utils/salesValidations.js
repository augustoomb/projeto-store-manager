const productsServices = require('../services/productsServices');

const checkProductId = (arrSalesProd) => {
  let returnObj = {};
  arrSalesProd.forEach((item) => {    
    if (item.productId === undefined) {
      returnObj = {
        error: {
          status: 400,
          message: '"productId" is required',
        },
      };
    }
  });
  return returnObj;
};

const checkQuantity = (arrSalesProd) => {
  let returnObj = {};
  arrSalesProd.forEach((item) => {
    if (item.quantity === undefined) {
      returnObj = {
        error: {
          status: 400,
          message: '"quantity" is required',
        },
      };
    }
  });
  return returnObj;
};

const checkQuantityIsGreaterThanZero = (arrSalesProd) => {
  let returnObj = {};
  arrSalesProd.forEach((item) => {
    if (item.quantity <= 0) {
      returnObj = {
        error: {
          status: 422,
          message: '"quantity" must be greater than or equal to 1',
        },
      };
    }
  });
  return returnObj;
};

// pega todos os productsId passados no body da req
const getAllProductsId = (arrSalesProd) => {
  const arrProductsId = [];

  arrSalesProd.forEach((item) => {
    arrProductsId.push(item.productId);
  });

  return arrProductsId;
};

// elimina os productsIds repetidos
// https://dicasdejavascript.com.br/javascript-como-remover-valores-repetidos-de-um-array/
const removeRepeatedElements = (arrProductsId) => [...new Set(arrProductsId)];

const checkProductsExistsInDb = async (arrSalesProd) => {
  let returnObj = {};

  const arrProductsId = getAllProductsId(arrSalesProd);
  const arrProdIdWithoutRep = removeRepeatedElements(arrProductsId);

  const teste = await Promise.all(
    arrProdIdWithoutRep.map((item) => productsServices.productExists(item)),
  );

  teste.forEach((item) => {
    if (item.prodExists === 0) {
      returnObj = {
        error: {
          status: 404,
          message: 'Product not found',
        },
      };
    }
  });

  return returnObj;
};

module.exports = {
  checkProductId,
  checkQuantity,
  checkQuantityIsGreaterThanZero,
  checkProductsExistsInDb,
};
