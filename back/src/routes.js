const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const ProductController = require('./controllers/ProductController');

routes.post('/login', UsersController.login);
routes.post('/user', UsersController.create);
routes.post('/emailvalidate/:code', UsersController.validateEmail);
routes.post('/newvalidatelogin', UsersController.newValidateLogin);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.delete('/products/:id', ProductController.delete);
routes.put('/products/:id', ProductController.update);

module.exports = routes;