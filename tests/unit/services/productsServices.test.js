const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModels');
const productsService = require('../../../services/productsServices');

describe('Ao buscar todos os produtos no banco', () => {
  before(async () => {
    const execute = [
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

    sinon.stub(productsModel, 'getAll').resolves(execute);
  })

  after(async () => {
    productsModel.getAll.restore();
  });

  it('um array é retornado', async () => {
    const result = await productsService.getAll();
    expect(result).to.be.an('array');
  });
});

describe('Ao buscar um produto específico no banco', () => {

  describe('e um id inválido é fornecido', () => {
    it('um objeto é retornado', async () => {
      const result = await productsService.getById('a');
      expect(result).to.have.a.property('error');
    });
  });

  describe('e um id válido é fornecido', () => {
    before(async () => {
      const execute = {
        "id": 1,
        "name": "Martelo de Thor"
      }

      sinon.stub(productsModel, 'getById').resolves(execute);
    })

    after(async () => {
      productsModel.getById.restore();
    });

    describe('e o produto é encontrado', () => {
      it('espera-se um objeto que tenha uma chave "id"', async () => {
        const result = await productsService.getById(2);
        expect(result).to.have.a.property('id');
      });
    });
  });
});