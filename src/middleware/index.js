'use strict';

const signup = require('./signup');

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  //adiciona a rota para o singup
  this.post('/signup', signup(app));

  //rotas padrões
  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
