'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const searchField = require('../../hooks/common/search-field');
const { unless, setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      unless(
        (hook) => (hook.method !== 'find' || hook.method !== 'get'),
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
