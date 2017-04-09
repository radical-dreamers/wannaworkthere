'use strict';

module.exports = function (options = {}) {
  return function (hook) {
    const query = hook.params.query;
    for (let field in query) {
      if(query[field]['$search'] && field.indexOf('$') == -1) {
        query[field] = { $regex: new RegExp(query[field].$search) };
      }
    };
    hook.params.query = query;
    return hook;
  }
}
