'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { unless, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');
const searchField = require('../../hooks/common/search-field');

module.exports = {
  before: {
    all: [ // call the authenticate hook before every method except 'create'
      unless(
        (hook) => hook.method === 'create',
        authenticate('jwt')
      )
    ],
    find: [searchField()],
    get: [],
    create: [setCreatedAt('createdAt'), setUpdatedAt('updatedAt')],
    update: [setUpdatedAt('updatedAt')],
    patch: [setUpdatedAt('updatedAt')],
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
