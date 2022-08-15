const productsModel = require('../models/productsModels');
const productValidations = require('../utils/productsValidation');
const codeErrors = require('../utils/codeErrors');

const { schema } = productValidations;
const { statusByErrorType } = codeErrors;

const mountObjErrorJoi = (err) => ({
  error: {
    status: statusByErrorType[err.error.details[0].type],
    message: err.error.details[0].message,
  },
});

const mountObjError = (code, mess) => ({
  error: {
    status: code,
    message: mess,
  },
});

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

const update = async (id, name) => {  
  const errorName = schema.validate({ name }); // validando o nome

  if (errorName.error) { return mountObjErrorJoi(errorName); } // se o nome informado tiver erro

  const idExistsInDb = await productsModel.productExists(id); // checando se prod existe no banco (pelo id)

  if (idExistsInDb.prodExists === 0) { // se o banco não encontrar, retorna 0
    return mountObjError(404, 'Product not found');
  }

  return productsModel.update(id, name);
};

module.exports = { getAll, getById, create, productExists, update };
