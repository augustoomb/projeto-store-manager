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

describe('Ao checar se um produto existe no banco', () => {
  before(async () => {
    const execute = [
      {
        "prodExists": 1
      }
    ]

    sinon.stub(productsModel, 'productExists').resolves(execute);
  })

  after(async () => {
    productsModel.productExists.restore();
  });

  it('um array é retornado', async () => {
    const result = await productsService.productExists();
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

describe('Ao buscar um produto por um termo específico do nome', () => {
  before(async () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    ]

    sinon.stub(productsModel, 'searchByTerm').resolves(execute);
  })

  after(async () => {
    productsModel.searchByTerm.restore();
  });

  it('um array é retornado', async () => {
    const result = await productsService.searchByTerm();
    expect(result).to.be.an('array');
  });
});

describe('Ao criar um novo produto', () => {

  describe('e um name com tamanho menor que 5 é fornecido', () => {
    const name = 'abc';
    it('um objeto é retornado', async () => {
      const result = await productsService.getById(name);
      expect(result).to.have.a.property('error');
    });
  });

  describe('e um name válido é fornecido', () => {
    const prodName = 'Sprite';

    before(() => {
      const productId = 1;

      sinon.stub(productsModel, 'create')
        .resolves({ id: productId })
    });

    after(() => {
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.create(prodName);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo prod inserido', async () => {
      const response = await productsService.create(prodName);

      expect(response).to.have.a.property('id');
    });
  });
});

describe('Ao atualizar um produto', () => {
  describe('e um name e id válidos são fornecidos', () => {
    const id = 1;
    const name = 'Sprite';

    before(() => {

      sinon.stub(productsModel, 'update')
        // .resolves({ id: id, name: name })
        .resolves({ id, name })
    });

    after(() => {
      productsModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.update(id, name);

      expect(response).to.be.a('object');
    });
  });
});

describe('Ao deletar um produto', () => {
  describe('e um id válido é fornecido', () => {
    const id = 1;

    before(() => {

      sinon.stub(productsModel, 'deleteProduct')
        .resolves({})
    });

    after(() => {
      productsModel.deleteProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.deleteProduct(id);

      expect(response).to.be.a('object');
    });
  });
});