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

describe('Ao buscar por um termo específico para nome de produto', () => {

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
    const result = await productsModel.searchByTerm('Martelo');
    expect(result).to.be.an('array');
  });

})

describe('Ao checar pelo ID se um produto existe no banco', () => {

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
    const result = await productsModel.productExists(1);
    expect(result).to.be.an('object');
  });

  it('o objeto tenha a propriedade id', async () => {
    const result = await productsModel.productExists(1);
    expect(result).to.be.a.property('id');
  });

  it('o objeto tenha a propriedade name', async () => {
    const result = await productsModel.productExists(1);
    expect(result).to.be.a.property('name');
  });
})

describe('Ao inserir um novo produto na api', () => {
  const payloadProd = {
    name: "Cerveja Heineken"
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
      const response = await productsModel.create(payloadProd);
      expect(response).to.be.a('object');
    })

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsModel.create(payloadProd);

      expect(response).to.have.a.property('id')
    });
  })
});

describe('Ao atualizar um produto na api', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves();
  })

  after(async () => {
    connection.execute.restore();
  });

  it('testa se o método "execute" foi chamado', async () => {
    await productsModel.update();
    expect(connection.execute.called).to.be.equal(true);
  })
});

describe('Ao deletar um produto na api', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves();
  })

  after(async () => {
    connection.execute.restore();
  });

  it('testa se o método "execute" foi chamado', async () => {
    await productsModel.deleteProduct();
    expect(connection.execute.called).to.be.equal(true);
  })
});
