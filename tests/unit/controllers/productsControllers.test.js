const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('Ao chamar o getAll do productController', () => {
  beforeEach(sinon.restore)
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
    res.json = sinon.stub().returns(res);

    await productsControllers.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });

  after(() => {
    productsService.getAll.restore();
  });
});

describe('Ao chamar o getById do productController', () => {
  const response = {};
  const request = {};
  let next = () => { };


  before(() => {
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(productsService, 'getById')
      .resolves({});
  })

  after(() => {
    productsService.getById.restore();
  });

  it('é recebido o status com o código 200', async () => {
    await productsControllers.getById(request, response, next);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Ao chamar o searchByTerm do productController', () => {
  const response = {};
  const request = {};

  before(() => {
    request.query = {
      q: 'Martelo',
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(productsService, 'searchByTerm')
      .resolves([]);
  })

  after(() => {
    productsService.searchByTerm.restore();
  });

  it('é recebido o status com o código 200', async () => {
    await productsControllers.searchByTerm(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Ao chamar o create do productController', () => {
  const response = {};
  const request = {};
  let next = () => { };

  before(() => {
    request.body = {
      name: 'Bola quadrada',
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(productsService, 'create')
      .resolves({});
  })

  after(() => {
    productsService.create.restore();
  });

  it('é recebido o status com o código 201', async () => {
    await productsControllers.create(request, response, next);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});

describe('Ao chamar o update do productController', () => {
  const response = {};
  const request = {};
  let next = () => { };

  before(() => {
    request.body = {
      name: 'Bola quadrada',
    };

    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(productsService, 'update')
      .resolves({});
  })

  after(() => {
    productsService.update.restore();
  });

  it('é recebido o status com o código 200', async () => {
    await productsControllers.update(request, response, next);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Ao chamar o deleteProduct do productController', () => {
  const response = {};
  const request = {};
  let next = () => { };

  before(() => {
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.end = sinon.stub()
      .returns();

    sinon.stub(productsService, 'deleteProduct')
      .resolves({});
  })

  after(() => {
    productsService.deleteProduct.restore();
  });

  it('é recebido o status com o código 204', async () => {
    await productsControllers.deleteProduct(request, response, next);

    expect(response.status.calledWith(204)).to.be.equal(true);
  });
});