const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesProductsModel = require('../../../models/salesProductsModel');

describe('Ao inserir uma nova venda de produto', () => {
  const payloadProdSales = {
    saleId: 2,
    productId: 1,
    quantity: 3
  }
  before(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  describe('Quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await salesProductsModel.create(payloadProdSales);
      expect(response).to.be.a('object');
    })
  })
});