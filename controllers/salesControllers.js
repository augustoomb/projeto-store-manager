const salesServices = require('../services/salesServices');

const create = async (req, res, _next) => {
  const { productId, quantity } = req.body;
  const sale = await salesServices.create(productId, quantity);

  return res.status(201).json(sale);
};

module.exports = {
  create,
};
