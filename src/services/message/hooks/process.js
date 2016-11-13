'use strict';

// src\services\message\hooks\process.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html


module.exports = function(options) {
  return function(hook){

    //o usuario autenticado
    const user = hook.data.user;

    //o texto da mensagem
    const text = hook.data.text

    //pega os primeiros 400 caracters
    .substring(0,400)

    //retira html tags
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    //reescreve os dados da mensagem
    hook.data = {

      ///adiciona o texto formatado
      text   : text,

      //adiciona o id do usuário
      userId : user._id,

      //adiciona a hora que foi criado
      createdAt : new Date().getTime() 
    }
  }
};
