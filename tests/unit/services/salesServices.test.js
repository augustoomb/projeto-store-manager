const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

describe('Buscar todas as vendas', () => {
  const execute = [
    {
      "saleId": 1,
      "date": "2022-08-17T18:53:50.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2022-08-17T18:53:50.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2022-08-17T18:53:50.000Z",
      "productId": 3,
      "quantity": 15
    }
  ]

  before(() => {
    sinon.stub(salesModel, 'getlAll').resolves(execute);
  });

  after(() => {
    salesModel.getlAll.restore();
  });

  it('um array de objetos é retornado', async () => {
    const sales = await salesServices.getAll();
    expect(sales).to.be.an('array');
  });
});

describe('Buscar uma venda específica', () => {
  const execute = [
    {
      "date": "2022-08-17T18:53:50.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "date": "2022-08-17T18:53:50.000Z",
      "productId": 2,
      "quantity": 10
    }
  ]

  before(() => {
    sinon.stub(salesModel, 'getById').resolves(execute);
  });

  after(() => {
    salesModel.getById.restore();
  });

  it('um array de objetos é retornado', async () => {
    const sales = await salesServices.getById();
    expect(sales).to.be.an('array');
  });
});

describe('Insere uma nova venda', () => {
  describe('quando o payload é inválido', () => {
    describe('quando o productId não é informado', () => {
      const payloadSale = [
        {
          "quantity": 1
        }
      ];

      it('um objeto é retornado', async () => {
        const response = await salesServices.create(payloadSale);
        expect(response).to.be.a('object');
      });

      it('possui a propriedade error', async () => {
        const response = await salesServices.create(payloadSale);
        expect(response).to.have.a.property('error');
      });
    });

    describe('quando a quantity não é informada', () => {
      const payloadSale = [
        {
          "productId": 1
        }
      ];

      it('um objeto é retornado', async () => {
        const response = await salesServices.create(payloadSale);
        expect(response).to.be.a('object');
      });

      it('possui a propriedade error', async () => {
        const response = await salesServices.create(payloadSale);
        expect(response).to.have.a.property('error');
      });
    });

    describe('quando a quantity informada é <= 0', () => {
      const payloadSale = [
        {
          "productId": 1,
          "quantity": 0
        }
      ];

      it('um objeto é retornado', async () => {
        const response = await salesServices.create(payloadSale);
        expect(response).to.be.a('object');
      });

      it('possui a propriedade error', async () => {
        const response = await salesServices.create(payloadSale);
        expect(response).to.have.a.property('error');
      });
    });

  });
});

describe('Ao deletar uma venda', () => {
  describe('e um id válido é fornecido', () => {
    const id = 1;

    before(() => {

      sinon.stub(salesModel, 'deleteSale')
        .resolves({})
    });

    after(() => {
      salesModel.deleteSale.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesServices.deleteSale(id);

      expect(response).to.be.a('object');
    });
  });
});