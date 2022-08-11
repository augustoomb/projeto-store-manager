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

module.exports = { getAll, getById };
