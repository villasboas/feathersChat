'use strict';

// src\services\user\hooks\gravatar.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

//para md5
const crypto = require('crypto');

//gravatar
const gravatarUrl = 'https://s.gravatar.com/avatar';

// O tamanho das imagens a serem buscadas no gravatar
const query = `s=60`;

//retorna a url do gravatar
const gravatarImage =  email => {

  //Seta a url para o gravatar de acordo com o email informado
  const hash = crypto.createHash('md5').update(email).digest('hex');
  return `${gravatarUrl}/${hash}?${query}`;
}

//principal modulo do hook
module.exports = function() {

  //funcao sendo retornada
  return function(hook) {
    
    //adiciona o gravatar no objeto do usuário
    hook.data = Object.assign({}, hook.data, {
      avatar : gravatarImage(hook.data.email)
    })
  };
};
