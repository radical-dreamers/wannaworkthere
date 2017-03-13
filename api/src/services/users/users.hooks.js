'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { unless, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');
const { hashPassword } = require('feathers-authentication-local').hooks;

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
    create: [ setCreatedAt('createdAt'), setUpdatedAt('updatedAt'), hashPassword() ],
    update: [ setUpdatedAt('updatedAt') ],
    patch: [ setUpdatedAt('updatedAt') ],
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
