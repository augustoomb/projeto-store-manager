const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

describe('Ao buscar todos os produtos na api', () => {

  before(async () => {
    const execute = [
      [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América",
        }
      ]
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('um array é retornado', async () => {
    const result = await productsModel.getAll();
    expect(result).to.be.an('array');
  });
})

describe('Ao buscar um produto específico na api', () => {

  before(async () => {
    const execute = [
      [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ]
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('somente um objeto é retornado', async () => {
    const result = await productsModel.getById(1);
    expect(result).to.be.an('object');
  });

  it('o objeto tenha a propriedade id', async () => {
    const result = await productsModel.getById(1);
    expect(result).to.be.a.property('id');
  });

  it('o objeto tenha a propriedade name', async () => {
    const result = await productsModel.getById(1);
    expect(result).to.be.a.property('name');
  });
})