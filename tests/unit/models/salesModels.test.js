const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');

describe('Ao buscar todos as vendas na api', () => {

  before(async () => {
    const execute = [
      [
        {
          "saleId": 1,
          "date": "2022-08-13T16:01:15.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2022-08-13T16:01:15.000Z",
          "productId": 2,
          "quantity": 10
        },
        {
          "saleId": 2,
          "date": "2022-08-13T16:01:15.000Z",
          "productId": 3,
          "quantity": 15
        }
      ]
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('um array é retornado', async () => {
    const result = await salesModel.getlAll();
    expect(result).to.be.an('array');
  });
})

describe('Ao inserir uma nova venda na api', () => {

  before(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  describe('Quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await salesModel.create();
      expect(response).to.be.a('object');
    })
  })
});
