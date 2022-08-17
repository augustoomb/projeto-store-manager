const sinon = require('sinon');
const { expect } = require('chai');

const mysql = require('mysql2/promise');

describe('Ao chamar o connection, o método createPool é executado', () => {
  before(async () => {
    sinon.stub(mysql, 'createPool').resolves();
  })

  after(async () => {
    mysql.createPool.restore();
  });

  it('testa se o método "createPool" foi chamado', async () => {
    mysql.createPool();
    expect(mysql.createPool.called).to.be.equal(true);
  })
});