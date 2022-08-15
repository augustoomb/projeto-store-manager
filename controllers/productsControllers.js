const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();

  res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsServices.getById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsServices.create(name);

  if (product.error) return next(product.error);

  return res.status(201).json(product);
};

const update = async (req, res, _next) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = await productsServices.update(id, name);

  return res.status(200).json(product);
};

module.exports = { getAll, getById, create, update };
