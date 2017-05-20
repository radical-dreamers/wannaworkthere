'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const searchField = require('../../hooks/common/search-field');
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      commonHooks.unless(
        (hook) => (hook.method !== 'find' || hook.method !== 'get'),
        authenticate('jwt')
      )
    ],
    find: [
      searchField(), 
      // if the user is not authenticated, only return those events already in Published status.
      commonHooks.iff(
        hook => hook.params.token, 
        authenticate('jwt')
      ).else ( hook => Object.assign(hook.params.query, { status: 'Published' }))
    ],
    get: [],
    create: [commonHooks.setCreatedAt('createdAt'), commonHooks.setUpdatedAt('updatedAt')],
    update: [commonHooks.setUpdatedAt('updatedAt')],
    patch: [commonHooks.setUpdatedAt('updatedAt')],
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
