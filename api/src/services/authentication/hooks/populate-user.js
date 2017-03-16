'use strict';

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function(options = {}) { // eslint-disable-line no-unused-vars
  return function(hook) {
    var userService = hook.app.service('users');

    return userService.get(hook.params.user._id).then(user => {
      hook.result.user = user;
      return Promise.resolve(hook);
    });
  };
};
