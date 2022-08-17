const express = require('express');
const rescue = require('express-rescue');
const productsController = require('./controllers/productsControllers');

const salesController = require('./controllers/salesControllers');

const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/search', rescue(productsController.searchByTerm)); // buscar por termo informado
app.get('/products', rescue(productsController.getAll));
app.get('/products/:id', rescue(productsController.getById));
app.post('/products', rescue(productsController.create));
app.put('/products/:id', rescue(productsController.update));
app.delete('/products/:id', rescue(productsController.deleteProduct));

app.get('/sales', rescue(salesController.getAll));
app.get('/sales/:id', rescue(salesController.getById));
app.post('/sales', rescue(salesController.create));
app.put('/sales/:id', rescue(salesController.update));
app.delete('/sales/:id', rescue(salesController.deleteSale));

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;