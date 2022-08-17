const productsServices = require('../services/productsServices');
const salesProductsModel = require('../models/salesProductsModel');

// SE ALGUM ITEM DO ARR TIVER productId UNDEFINED, O OBJ DE ERRO É PREENCHIDO E DEPOIS RETORNADO
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

// SE ALGUM ITEM DO ARR TIVER quantity UNDEFINED, O OBJ DE ERRO É PREENCHIDO E DEPOIS RETORNADO
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

// SE ALGUM ITEM DO ARR TIVER quantity <= 0, O OBJ DE ERRO É PREENCHIDO E DEPOIS RETORNADO
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

// USO INTERNO
// pega todos os productsId passados no body da req
const getAllProductsId = (arrSalesProd) => {
  const arrProductsId = [];

  arrSalesProd.forEach((item) => {
    arrProductsId.push(item.productId);
  });

  return arrProductsId;
};

// USO INTERNO
// elimina os productsIds repetidos
// https://dicasdejavascript.com.br/javascript-como-remover-valores-repetidos-de-um-array/
const removeRepeatedElements = (arrProductsId) => [...new Set(arrProductsId)];

// CHECA SE CADA PRODUTO EXISTE NO BANCO
const checkProductsExistsInDb = async (arrSalesProd) => {
  let returnObj = {};

  const arrProductsId = getAllProductsId(arrSalesProd); // AQUI TENHO UM ARR SÓ COM OS PROD IDs DOS PRODs
  const arrProdIdWithoutRep = removeRepeatedElements(arrProductsId);// REMOVO OS PROD IDs REPETIDOS (opcional)

  // TESTA SE CADA PROD ID EXISTE NO BANCO. NO FIM DO PROCESSO VOU TER UM ARR COM ELEMENTOS 0 ou 1.
  // 0: O ELEMENTO NÃO FOI ENCONTRADO. 1: O ELEMENTO FOI ENCONTRADO
  const teste = await Promise.all( 
    arrProdIdWithoutRep.map((item) => productsServices.productExists(item)),
  );

  // AQUI TESTO TODOS OS ITEMS. SE ALGUM FOR ZERO, SIGNIFICA QUE UM DOS PRODs NÃO FOI ENCONTRADO NO BANCO
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

const saleExists = async (saleId, productId) => {
  const booleanObjSaleIdExists = await salesProductsModel.saleIdExists(saleId);
  const booleanObjProdIdExists = await salesProductsModel.prodIdExists(productId);
  if (booleanObjSaleIdExists.saleExists === 0) {
    return {
      error: {
        status: 404, message: 'Sale not found',
      },
    };
  }

  if (booleanObjProdIdExists.saleExists === 0) {
    return {
      error: {
        status: 404, message: 'Product not found',
      },
    };
  }

  return booleanObjSaleIdExists; // 1 existe
};

module.exports = {
  checkProductId,
  checkQuantity,
  checkQuantityIsGreaterThanZero,
  checkProductsExistsInDb,
  saleExists,
};
