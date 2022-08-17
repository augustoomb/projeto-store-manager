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

describe('Ao atualizar uma venda de produto', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves();
  })

  after(async () => {
    connection.execute.restore();
  });

  it('testa se o método "execute" foi chamado', async () => {
    await salesProductsModel.update();
    expect(connection.execute.called).to.be.equal(true);
  })
});

describe('Ao checar pelo ID se uma venda existe no banco', () => {

  before(async () => {
    const execute = [
      [
        {
          "saleExists": 1
        }
      ]
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('somente um objeto é retornado', async () => {
    const result = await salesProductsModel.saleIdExists(1);
    expect(result).to.be.an('object');
  });
})

describe('Ao checar pelo ID se um produto existe no banco', () => {

  before(async () => {
    const execute = [
      [
        {
          "saleExists": 1
        }
      ]
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('somente um objeto é retornado', async () => {
    const result = await salesProductsModel.prodIdExists(1);
    expect(result).to.be.an('object');
  });
})