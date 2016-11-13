'use strict';

const restrictToSender = require('./restrict-to-sender');

//os hooks que eu fiz
const process = require('./process');

//os hooks gerados pelo feathers
const globalHooks = require('../../../hooks');
const hooks       = require('feathers-hooks');
const auth        = require('feathers-authentication').hooks;

//Isso é tipo um Join
const populateSender = hooks.populate('sentBy', {
  service: 'users',
  field  : 'userId'
});

//hooks executados antes do service
exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find   : [],
  get    : [],
  create : [process()],
  update : [hooks.remove('sentBy'), restrictToSender()],
  patch  : [hooks.remove('sentBy'), restrictToSender()],
  remove : [restrictToSender()]
};

//hooks executados depois do service
exports.after = {
  all    : [],
  find   : [populateSender],
  get    : [populateSender],
  create : [populateSender],
  update : [],
  patch  : [],
  remove : []
};
