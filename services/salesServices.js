const salesModel = require('../models/salesModels');
const salesProductModel = require('../models/salesProductsModel');

const salesValidations = require('../utils/salesValidations');

const {
  checkProductId, checkQuantity, checkQuantityIsGreaterThanZero, checkProductsExistsInDb,
} = salesValidations;

// usado apenas para montar o retorno da função create;
// function mountReturn(salesProduct, id) {
//   return {
//     id,
//     itemsSold: salesProduct,
//   };
// }

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
  // CHECA ERROS SIMPLES NOS DADOS INFORMADOS NO BODY
  const productIdIsError = checkProductId(arrSalesProd);
  const quantityIsError = checkQuantity(arrSalesProd);
  const sizeIsError = checkQuantityIsGreaterThanZero(arrSalesProd);  

  // SE ALGUMA DAS 3 CHECAGENS ACIMA TIVER UM ERRO, VAI ENTRAR AQUI
  if (productIdIsError.error) return productIdIsError;
  if (quantityIsError.error) return quantityIsError;
  if (sizeIsError.error) return sizeIsError;

  // JÁ QUE OS PRODUTOS E AS QUANT INFORMADAS SÃO VÁLIDAS, PRECISO CHECAR SE CADA PROD DO ARR EXISTE NO BANCO
  const productIdExistsIsError = await checkProductsExistsInDb(arrSalesProd);
  if (productIdExistsIsError.error) return productIdExistsIsError;

  // JÁ QUE OS PROD INFORMADOS EXISTEM NO BANCO, VOU DAR UM CREATE SIMPLES NA TABELA sales
  const { saleId } = await salesModel.create();

  /* COM A CRIAÇÃO FEITA ACIMA, TENHO O ID DA VENDA. DEVO USAR ESSE MESMO ID PARA CADASTRAR CADA 
  productId E quantity NA TABELA sales_product. COMO RETORNO, TENHO UM ARR DE OBJS FORMADO PELO prodId + quant */
  const salesProduct = await Promise.all(
    arrSalesProd.map((salesProd) => salesProductModel.create(
      saleId, salesProd.productId, salesProd.quantity,
    )),
  );
  
  // RETORNO O ID QUE CADASTREI NA TABELA sales + O ARR DE OBJ DA LINHA ACIMA
  return {
    id: saleId,
    itemsSold: salesProduct,
  };

  // const obj = mountReturn(salesProduct, saleId);

  // return obj;
};

module.exports = {
  create,
  getAll,
  getById,
};
