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

const searchByTerm = async (req, res, _next) => {
  const { q } = req.query;

  const products = await productsServices.searchByTerm(q);

  return res.status(200).json(products);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsServices.create(name);

  if (product.error) return next(product.error);

  return res.status(201).json(product);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = await productsServices.update(id, name);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsServices.deleteProduct(id);

  if (product.error) return next(product.error);

  return res.status(204).end();
};

module.exports = { getAll, getById, searchByTerm, create, update, deleteProduct };
