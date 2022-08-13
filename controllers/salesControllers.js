const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();
  
  res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesServices.getById(id);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

const create = async (req, res, next) => {
  const arrSalesProd = req.body;

  const sale = await salesServices.create(arrSalesProd);

  if (sale.error) return next(sale.error);

  return res.status(201).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
