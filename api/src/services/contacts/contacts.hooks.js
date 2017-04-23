'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const searchField = require('../../hooks/common/search-field');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [searchField()],
    get: [],
    create: [],
    update: [],
    patch: [],
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
