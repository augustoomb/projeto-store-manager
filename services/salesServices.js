const salesModel = require('../models/salesModels');
const salesProductModel = require('../models/salesProductsModel');

const salesValidations = require('../utils/salesValidations');

const {
  checkProductId, checkQuantity, checkQuantityIsGreaterThanZero, checkProductsExistsInDb,
  saleExists,
} = salesValidations;

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

const update = async (saleId, arrSalesProd) => {
  // CHECA ERROS SIMPLES NOS DADOS INFORMADOS NO BODY
  const productIdIsError = checkProductId(arrSalesProd);
  if (productIdIsError.error) return productIdIsError;
  const quantityIsError = checkQuantity(arrSalesProd);
  if (quantityIsError.error) return quantityIsError;
  const sizeIsError = checkQuantityIsGreaterThanZero(arrSalesProd);
  if (sizeIsError.error) return sizeIsError;

    // checa se o saleId passado na URL e o prodId passado em cada obj do arr do body, existem no bd
  const saleExistsIsError = await Promise.all(
    arrSalesProd.map((salesProd) => saleExists(saleId, salesProd.productId)),
  );

  // a linha acima testa cada prodId passado no body
  // ao final, terei um arr, sendo que cada item do arr terá o resultado do teste...
  // ...no caso do prodId não encontrado, o item terá a propriedade error.
  // abaixo testo e filtro todos os elementos que contem esse erro...
  const searchErrors = saleExistsIsError.filter((item) => item.error !== undefined);

  // ... se o arr tiver pelo menos 1 elemento, sei que deu erro (prod ou sales não encontrado no bd)
  if (searchErrors.length > 0) { return searchErrors[0]; }

  // chegando aqui, não há erros. Por isso, basta atualizar os dados no banco
  const salesProductUpdated = await Promise.all(
    arrSalesProd.map((salesProd) => salesProductModel.update(
      saleId, salesProd.productId, salesProd.quantity,
    )),
  );

  // e retornar conforme pedido no requisito.
  return { saleId, itemsUpdated: salesProductUpdated };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getById(id);

  if (sale.length === 0) {
    return {
      error: {
        status: 404,
        message: 'Sale not found',
      },
    };
  }

  return salesModel.deleteSale(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale,
};
