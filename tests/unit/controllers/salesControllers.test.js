const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('Ao chamar o getAll do salesController', () => {
  beforeEach(sinon.restore)
  it('espera-se um código 200 como resposta', async () => {
    sinon.stub(salesService, 'getAll').resolves(
      [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    );

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });

  after(() => {
    salesService.getAll.restore();
  });
});

describe('Ao chamar o getById do salesController', () => {
  beforeEach(sinon.restore)

  const response = {};
  const request = {};


  before(() => {
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(salesService, 'getById')
      .resolves(true);
  })

  // after(() => {
  //   productsService.getById.restore();
  // });

  it('é chamado o status com o código 200', async () => {
    await salesControllers.getById(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Ao chamar o create do salesController', () => {
  beforeEach(sinon.restore)

  const response = {};
  const request = {};
  let next = () => { };


  before(() => {
    request.body = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(salesService, 'create')
      .resolves(true);
  })

  // after(() => {
  //   productsService.getById.restore();
  // });

  it('é chamado o status com o código 201', async () => {
    await salesControllers.create(request, response, next);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});