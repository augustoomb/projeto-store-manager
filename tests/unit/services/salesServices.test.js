const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

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

  // describe('quando o payload é válido', () => {
  //   const payloadSale = [
  //     {
  //       "productId": 1,
  //       "quantity": 1
  //     }
  //   ];


  //   before(async () => {
  //     const saleId = 1;

  //     sinon.stub(salesModel, 'create')
  //       .resolves({ id: saleId });
  //   })

  //   after(async () => {
  //     salesModel.create.restore();
  //   });

  //   describe('e o productId informado existe no banco', () => {
  //     it('retorna um objeto', async () => {
  //       const response = await salesServices.create();

  //       expect(response).to.be.a('object');
  //     });
  //   });
  // });
});