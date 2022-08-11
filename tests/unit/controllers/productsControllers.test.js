const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('Ao chamar o getAll do productController', () => {
  it('espera-se um código 200 como resposta', async () => {
    sinon.stub(productsService, 'getAll').resolves(
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
    );

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });
});