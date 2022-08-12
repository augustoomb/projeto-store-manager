const salesServices = require('../services/salesServices');

const create = async (req, res, _next) => {
  const arrSalesProd = req.body;

  // const sale = await salesServices.create(productId, quantity);
  const sale = await salesServices.create(arrSalesProd);

  return res.status(201).json(sale);
};

module.exports = {
  create,
};
