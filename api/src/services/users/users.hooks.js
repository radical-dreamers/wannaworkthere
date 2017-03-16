'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { unless, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');
const { hashPassword } = require('feathers-authentication-local').hooks;
const restrictToDomain = require('./hooks/restrict-to-domain');

module.exports = {
  before: {
    all: [
      // call the authenticate hook before every method except 'create'
      unless(
        (hook) => hook.method === 'create',
        authenticate('jwt')
      )
    ],
    find: [],
    get: [],
    create: [ restrictToDomain(), setCreatedAt('createdAt'), setUpdatedAt('updatedAt'), hashPassword() ],
    update: [ restrictToDomain(), setUpdatedAt('updatedAt') ],
    patch: [ restrictToDomain(), setUpdatedAt('updatedAt') ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
