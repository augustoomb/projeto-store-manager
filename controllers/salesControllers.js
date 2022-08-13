const salesServices = require('../services/salesServices');

const create = async (req, res, next) => {
  const arrSalesProd = req.body;

  const sale = await salesServices.create(arrSalesProd);

  if (sale.error) return next(sale.error);

  return res.status(201).json(sale);
};

module.exports = {
  create,
};
