'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { setCreatedAt, setUpdatedAt } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ setCreatedAt('createdAt'), setUpdatedAt('updatedAt')],
    update: [ authenticate('jwt'), setUpdatedAt('updatedAt')],
    patch: [ authenticate('jwt'), setUpdatedAt('updatedAt') ],
    remove: [ authenticate('jwt') ]
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
