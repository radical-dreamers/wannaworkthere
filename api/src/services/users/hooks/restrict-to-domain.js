'use strict';

const errors = require('feathers-errors');
const minimatch = require('minimatch');

module.exports = function (options = {}) {
  return function(hook) {
    const app = hook.app;
    const allowedDomains = app.get('registeredDomains');

    if (hook.type !== 'before') {
      return Promise.reject(new Error('The \'restrictToDomain\' hook should only be used as a \'before\' hook.'));
    }

    for (var i in allowedDomains) {
      if (minimatch(hook.data.email, allowedDomains[i])) {
        return Promise.resolve(hook);
      }
    }
    return Promise.reject(new errors.Forbidden('User must belong to an enabled domain'));
  };
};
