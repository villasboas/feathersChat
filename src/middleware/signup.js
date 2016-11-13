'use strict';

//Middleware para novas assinaturas
module.exports = function(app) {

  //retorna o Middleware
  return function(req, res, next) {

    //pega o corpo da requisição
    const body = req.body;

    //cria o novo usuário
    app.service('users').create({

      //pega os dados
      email    : body.email,
      password : body.password

    })

    //após criar o usuário
    .then( user => res.redirect('/login.html'))

    //caso algo de errado
    .catch(next);
  };
};
