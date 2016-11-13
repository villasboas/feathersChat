'use strict';

// src\services\message\hooks\restrict-to-sender.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

//carrega o modulo de erros do feathers
const errors = require('feathers-errors');

module.exports = function(options) {

  //retorna o hook
  return function(hook) {

    //pega o service de mensagem
    const messageService = hook.app.service('message');

    //pega a mensagem que o usuario quer acessar
    return messageService.get(hook.id, hook.params)
    
    //após pegar os dados
    .then( message => {

      //verifica se o id do usuário é o mesmo da mensagem
      if( message.sentBy._id !== hook.params.use._id ) {
        
        //informa que o usuário não tem permissão para essa ação
        throw new errors.NotAuthenticated('Access not Allowed');
      }

      //caso esteja tudo okay
      return hook;
    });
};
};
