(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-view')}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e015f16", __vue__options__)
  } else {
    hotAPI.reload("data-v-2e015f16", __vue__options__)
  }
})()}
});

;require.register("api/auth.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoints = {
  login: '/authentication'
}; /**
    * Example auth api connector that lets your user log in using a defined payload
    * and returns a promise
    */

exports.default = {
  login: function login(payload) {
    payload.strategy = 'local';
    var res = _api2.default.post(endpoints.login, payload);
    return res;
  },
  logout: function logout() {
    //let res = api.remove(endpoints.login)
    console.log('logout');
  }
};

});

require.register("api/contacts.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crudApi = require('./crud-api');

var _crudApi2 = _interopRequireDefault(_crudApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _crudApi2.default('registrations/');

});

require.register("api/crud-api.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class implements a typical CRUD REST API connector with the typical operations.
 */
var BaseRestApi = function () {
  function BaseRestApi(baseUrl) {
    _classCallCheck(this, BaseRestApi);

    this.endpoints = {
      create: baseUrl,
      update: baseUrl + ':id',
      get: baseUrl + ':id',
      find: baseUrl,
      delete: baseUrl + ':id'
    };
  }

  /**
   * Creates a new instance
   * @param  {[type]} payload [description]
   * @return {Promise}         [description]
   */


  _createClass(BaseRestApi, [{
    key: 'create',
    value: function create(instance) {
      var response = _api2.default.post(this.endpoints.create, instance);
      return response;
    }
    /**
     * Updates an existing instance of with id "id"
     */

  }, {
    key: 'update',
    value: function update(id, instance) {
      var response = _api2.default.patch(this.endpoints.update.replace(':id', id), instance);
      return response;
    }
    /**
     * Finds all instances matching the filters
     */

  }, {
    key: 'find',
    value: function find(filters) {
      var response = _api2.default.get(this.endpoints.find, { params: filters });
      return response;
    }
    /**
     * Finds a specific instance
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */

  }, {
    key: 'get',
    value: function get(id) {
      var response = _api2.default.get(this.endpoints.update.replace(':id', id));
      return response;
    }
    /**
     * Removes a specific instance
     */

  }, {
    key: 'remove',
    value: function remove(id) {
      var response = _api2.default.delete(this.endpoints.update.replace(':id', id));
      return response;
    }
  }]);

  return BaseRestApi;
}();

exports.default = BaseRestApi;

});

require.register("api/events.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crudApi = require('./crud-api');

var _crudApi2 = _interopRequireDefault(_crudApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _crudApi2.default('events/');

});

require.register("api/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _registrations = require('./registrations');

var _registrations2 = _interopRequireDefault(_registrations);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _contacts = require('./contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _interceptors = require('./interceptors');

var _interceptors2 = _interopRequireDefault(_interceptors);

var _api = require('../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Setup interceptors
 */
_api2.default.interceptors.request.use(_interceptors2.default.AuthInterceptor);
_api2.default.interceptors.response.use(undefined, _interceptors2.default.NotAuthorizedInterceptor);
_api2.default.interceptors.response.use(undefined, _interceptors2.default.ApiErrorInterceptor);

/**
 * This module implements all api method connections we need
 */
exports.default = {
  auth: _auth2.default,
  registrations: _registrations2.default,
  users: _users2.default,
  contacts: _contacts2.default,
  events: _events2.default
};

});

require.register("api/interceptors/api-error-interceptor.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (error) {
  console.log({
    type: 'API ERROR',
    status: error.response.status,
    url: error.config.url,
    headers: error.config.headers,
    data: error.config.data,
    details: error.response.data

  });
  _vuexStore2.default.dispatch('addMessage', {
    title: 'There was a problem',
    text: error.response ? error.response.data.message : error.message,
    type: 'error'
  });
  return Promise.reject(error);
};

var _vuexStore = require('../../vuex-store');

var _vuexStore2 = _interopRequireDefault(_vuexStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

});

;require.register("api/interceptors/auth-interceptor.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  if (_vuexStore2.default.getters.isLoggedIn) {
    Object.assign(config.headers, { Authorization: _vuexStore2.default.getters.token });
  }
  return config;
};

var _vuexStore = require('../../vuex-store');

var _vuexStore2 = _interopRequireDefault(_vuexStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

});

;require.register("api/interceptors/index.js", function(exports, require, module) {
'use strict';

var _apiErrorInterceptor = require('./api-error-interceptor');

var _apiErrorInterceptor2 = _interopRequireDefault(_apiErrorInterceptor);

var _authInterceptor = require('./auth-interceptor');

var _authInterceptor2 = _interopRequireDefault(_authInterceptor);

var _notAuthorizedInterceptor = require('./not-authorized-interceptor');

var _notAuthorizedInterceptor2 = _interopRequireDefault(_notAuthorizedInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ApiErrorInterceptor: _apiErrorInterceptor2.default,
  AuthInterceptor: _authInterceptor2.default,
  NotAuthorizedInterceptor: _notAuthorizedInterceptor2.default
};

});

require.register("api/interceptors/not-authorized-interceptor.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (error) {
  var router = window.app.$root.$router;
  var route = window.app.$root.$route;
  if (error.response.status == 401 && route.name != 'admin.login') {
    window.app.$root.$router.push({ name: 'admin.login', query: {
        next: window.app.$root.$route.fullPath
      } });
  }
  return Promise.reject(error);
};

});

require.register("api/registrations.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crudApi = require('./crud-api');

var _crudApi2 = _interopRequireDefault(_crudApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _crudApi2.default('registrations/');

});

require.register("api/users.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crudApi = require('./crud-api');

var _crudApi2 = _interopRequireDefault(_crudApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _crudApi2.default('users/');

});

require.register("components/Main.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vuex = require('vuex');

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _fadeInTransition = require('./common/transitions/fade-in-transition');

var _fadeInTransition2 = _interopRequireDefault(_fadeInTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'AdminMain',
  computed: _extends({}, (0, _vuex.mapGetters)(['isLoggedIn'])),
  components: {
    'anonymous-layout': _layout2.default.AnonymousLayout,
    'default-layout': _layout2.default.DefaultLayout,
    'fade-in-transition': _fadeInTransition2.default

  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[(_vm.isLoggedIn)?_c('default-layout',[_c('div',{slot:"content"},[_c('fade-in-transition',[_c('router-view')],1)],1)]):_c('anonymous-layout',[_c('div',{slot:"content"},[_c('fade-in-transition',[_c('router-view')],1)],1)])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-34d26926", __vue__options__)
  } else {
    hotAPI.reload("data-v-34d26926", __vue__options__)
  }
})()}
});

;require.register("components/auth/Login.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vuex = require('vuex');

exports.default = {
  data: function data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    };
  },
  methods: _extends({}, (0, _vuex.mapActions)(['login', 'addMessage']), {
    doLogin: function doLogin(event) {
      var _this = this;

      this.$validator.validateAll().then(function (success) {
        _this.login({
          email: _this.email,
          password: _this.password,
          rememberMe: _this.rememberMe
        }).then(function (result) {
          _this.addMessage({
            text: 'Bienvenido/a ' + result.data.user.firstName,
            type: 'success'
          });

          if (_this.$route.query.next) {
            _this.$router.push(_this.$route.query.next);
          } else {
            _this.$router.push({ name: 'admin.home' });
          }
        }).catch(function (error) {});
      }).catch(function (error) {
        _this.addMessage({
          text: 'Debes corregir los errores en el formulario',
          type: 'error'
        });
      });
    }
  })
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero is-fullheight"},[_c('div',{staticClass:"hero-body"},[_c('div',{staticClass:"container is-half-desktop"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-4-tablet is-offset-4-tablet"},[_c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"card-content"},[_c('form',{staticClass:"content",attrs:{"novalidate":""},on:{"submit":function($event){$event.stopPropagation();$event.preventDefault();_vm.doLogin($event)}}},[_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"email"}},[_vm._v("Email")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:email.initial",value:('required|email'),expression:"'required|email'",arg:"email",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],staticClass:"input",class:{'is-danger': _vm.errors.has('email')},attrs:{"name":"email","type":"text","placeholder":"someone@altimetrik.com"},domProps:{"value":(_vm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.email=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('email')),expression:"errors.has('email')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning is-danger"})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('email')),expression:"errors.has('email')"}],staticClass:"help is-danger"},[_vm._v("No es un email valido.")])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"password"}},[_vm._v("Password")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:password.initial",value:('required'),expression:"'required'",arg:"password",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"input",class:{'is-danger': _vm.errors.has('password')},attrs:{"name":"password","type":"password","placeholder":"password1"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('password')),expression:"errors.has('password')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning "})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('password')),expression:"errors.has('password')"}],staticClass:"help is-danger"},[_vm._v("Este campo es requerido.")])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('p',{staticClass:"control"},[_c('label',{staticClass:"checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.rememberMe),expression:"rememberMe"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.rememberMe)?_vm._i(_vm.rememberMe,null)>-1:(_vm.rememberMe)},on:{"__c":function($event){var $$a=_vm.rememberMe,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$c){$$i<0&&(_vm.rememberMe=$$a.concat($$v))}else{$$i>-1&&(_vm.rememberMe=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.rememberMe=$$c}}}}),_vm._v("\n                        Recordarme\n                      ")])])]),_vm._v(" "),_vm._m(2)])]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"content"},[_c('p',{staticClass:"is-help"},[_vm._v("¿No tenés cuenta? "),_c('router-link',{attrs:{"to":{ name: 'admin.signup'}}},[_vm._v("Registrate")])],1)])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-image"},[_c('figure',{staticClass:"image"},[_c('img',{attrs:{"src":"/img/altimetrik-logo.png","alt":"Altimetrik Logo"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('div',{staticClass:"container has-text-centered"},[_c('p',{staticClass:"title is-3"},[_vm._v("\n                  Inicia Sesión\n                ")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field is-clearfix"},[_c('p',{staticClass:"control is-pulled-right"},[_c('button',{staticClass:"button is-primary",attrs:{"type":"submit"}},[_vm._v("Entrar")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e8ee29a2", __vue__options__)
  } else {
    hotAPI.reload("data-v-e8ee29a2", __vue__options__)
  }
})()}
});

;require.register("components/auth/Signup.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vuex = require('vuex');

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      email: '',
      password: '',
      confirm: '',
      firstName: '',
      lastName: ''
    };
  },
  methods: _extends({}, (0, _vuex.mapActions)(['addMessage']), {
    signup: function signup(event) {
      var _this = this;

      this.$validator.validateAll().then(function (success) {
        _api2.default.users.create({
          email: _this.email,
          password: _this.password,
          firstName: _this.firstName,
          lastName: _this.lastName
        }).then(function (success) {
          _this.addMessage({
            text: 'Tu registro fue exitoso!',
            type: 'success'
          });
          _this.$router.push({ name: 'admin.login' });
        }).catch(function (error) {});
      }).catch(function (error) {
        _this.addMessage({
          text: 'Debes corregir los errores en el formulario',
          type: 'error'
        });
      });
    }
  })
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero is-fullheight"},[_c('div',{staticClass:"hero-body"},[_c('div',{staticClass:"container is-half-desktop"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-4-tablet is-offset-4-tablet"},[_c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"card-content"},[_c('form',{staticClass:"content",attrs:{"novalidate":""},on:{"submit":function($event){$event.stopPropagation();$event.preventDefault();_vm.signup($event)}}},[_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"email"}},[_vm._v("Email")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:email.initial",value:('required|email'),expression:"'required|email'",arg:"email",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],staticClass:"input",class:{'is-danger': _vm.errors.has('email')},attrs:{"name":"email","type":"text","placeholder":"someone@altimetrik.com"},domProps:{"value":(_vm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.email=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('email')),expression:"errors.has('email')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning is-danger"})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('email')),expression:"errors.has('email')"}],staticClass:"help is-danger"},[_vm._v("No es un email valido.")])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"firstName"}},[_vm._v("Nombres")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:firstName.initial",value:('required'),expression:"'required'",arg:"firstName",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.firstName),expression:"firstName"}],staticClass:"input",class:{'is-danger': _vm.errors.has('firstName')},attrs:{"name":"firstName","type":"text","placeholder":"Julio"},domProps:{"value":(_vm.firstName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.firstName=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('firstName')),expression:"errors.has('firstName')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning is-danger"})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('firstName')),expression:"errors.has('firstName')"}],staticClass:"help is-danger"},[_vm._v("Este campo es requerido.")])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"lastName"}},[_vm._v("Apellidos")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:lastName.initial",value:('required'),expression:"'required'",arg:"lastName",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.lastName),expression:"lastName"}],staticClass:"input",class:{'is-danger': _vm.errors.has('lastName')},attrs:{"name":"lastName","type":"text","placeholder":"Rios"},domProps:{"value":(_vm.lastName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.lastName=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('lastName')),expression:"errors.has('lastName')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning is-danger"})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('lastName')),expression:"errors.has('lastName')"}],staticClass:"help is-danger"},[_vm._v("Este campo es requerido.")])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"password"}},[_vm._v("Password")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:password.initial",value:('required'),expression:"'required'",arg:"password",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"input",class:{'is-danger': _vm.errors.has('password')},attrs:{"name":"password","type":"password","placeholder":"password1"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('password')),expression:"errors.has('password')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning "})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('password')),expression:"errors.has('password')"}],staticClass:"help is-danger"},[_vm._v("Este campo es requerido.")])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"confirm"}},[_vm._v("Confirmar Password")]),_vm._v(" "),_c('p',{staticClass:"control has-icon has-icon-right"},[_c('input',{directives:[{name:"validate",rawName:"v-validate:confirm.initial",value:('required|confirmed:password'),expression:"'required|confirmed:password'",arg:"confirm",modifiers:{"initial":true}},{name:"model",rawName:"v-model",value:(_vm.confirm),expression:"confirm"}],staticClass:"input",class:{'is-danger': _vm.errors.has('confirm')},attrs:{"name":"confirm","type":"password","placeholder":"password1"},domProps:{"value":(_vm.confirm)},on:{"input":function($event){if($event.target.composing){ return; }_vm.confirm=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('confirm')),expression:"errors.has('confirm')"}],staticClass:"icon is-small"},[_c('i',{staticClass:"fa fa-warning "})])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.errors.has('confirm')),expression:"errors.has('confirm')"}],staticClass:"help is-danger"},[_vm._v("Debe coincidir con tu password.")])]),_vm._v(" "),_vm._m(2)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-image"},[_c('figure',{staticClass:"image"},[_c('img',{attrs:{"src":"/img/altimetrik-logo.png","alt":"Altimetrik Logo"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('div',{staticClass:"container has-text-centered"},[_c('p',{staticClass:"title is-3"},[_vm._v("\n                  Registrate\n                ")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field is-clearfix"},[_c('p',{staticClass:"control is-pulled-right"},[_c('button',{staticClass:"button is-primary",attrs:{"type":"submit"}},[_vm._v("Registrarme")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31ee67c2", __vue__options__)
  } else {
    hotAPI.reload("data-v-31ee67c2", __vue__options__)
  }
})()}
});

;require.register("components/auth/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Login = require('./Login.vue');

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require('./Signup.vue');

var _Signup2 = _interopRequireDefault(_Signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  name: 'admin.login',
  path: 'login',
  component: _Login2.default,
  meta: {
    loginRequired: false,
    title: 'Iniciá Sesión'
  }
}, {
  name: 'admin.signup',
  path: 'signup',
  component: _Signup2.default,
  meta: {
    loginRequired: false,
    title: 'Registrate'
  }
}];

});

require.register("components/common/detail/content-section.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    title: {
      type: String,
      required: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[(_vm.title)?_c('h1',{staticClass:"title is-4"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"columns is-multiline"},[_vm._t("fields")],2),_vm._v(" "),_c('hr')])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f9b780c", __vue__options__)
  } else {
    hotAPI.reload("data-v-1f9b780c", __vue__options__)
  }
})()}
});

;require.register("components/common/detail/detail-object.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"section"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('div',{staticClass:"level"},[(_vm.title)?_c('div',{staticClass:"level-left"},[_c('div',{staticClass:"level-item"},[_c('h1',{staticClass:"title is-3"},[_vm._v(_vm._s(_vm.title))])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"level-right"},[_vm._t("toolbar-items")],2)]),_vm._v(" "),(_vm.subtitle)?_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',{staticClass:"level-item"},[_c('h2',{staticClass:"subtitle is-5 is-"},[_vm._v(_vm._s(_vm.subtitle))])])])]):_vm._e()])]),_vm._v(" "),_c('hr'),_vm._v(" "),_vm._t("content-sections")],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cbb24c38", __vue__options__)
  } else {
    hotAPI.reload("data-v-cbb24c38", __vue__options__)
  }
})()}
});

;require.register("components/common/detail/fields/checkbox.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    legend: {
      type: String,
      required: false,
      default: ''
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"has-text-centered"},[_c('span',{staticClass:"tag is-medium",class:{'is-success': _vm.value, 'is-danger': !_vm.value}},[_vm._v(_vm._s(_vm.legend))])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b39de7c", __vue__options__)
  } else {
    hotAPI.reload("data-v-7b39de7c", __vue__options__)
  }
})()}
});

;require.register("components/common/detail/fields/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textField = require('./text-field.vue');

var _textField2 = _interopRequireDefault(_textField);

var _tagList = require('./tag-list.vue');

var _tagList2 = _interopRequireDefault(_tagList);

var _checkbox = require('./checkbox.vue');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  TextField: _textField2.default,
  TagList: _tagList2.default,
  Checkbox: _checkbox2.default
};

});

require.register("components/common/detail/fields/tag-list.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    label: {
      type: String,
      required: false
    },
    tags: {
      type: Array,
      required: false,
      default: []
    },
    level: {
      type: String,
      required: false,
      default: 'is-default'
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"content"},_vm._l((_vm.tags),function(tag){return _c('span',[_c('span',{staticClass:"tag",class:[_vm.level]},[_vm._v(_vm._s(tag))]),_vm._v(" \n    ")])}))])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-944d1e20", __vue__options__)
  } else {
    hotAPI.reload("data-v-944d1e20", __vue__options__)
  }
})()}
});

;require.register("components/common/detail/fields/text-field.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    label: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[_c('p',{staticClass:"is-medium"},[(_vm.label)?_c('span',{staticClass:"label"},[_vm._v(_vm._s(_vm.label))]):_vm._e()]),_c('p',{staticClass:"is-medium"},[_vm._v("\n      "+_vm._s(_vm.text)+"\n    ")]),_vm._v(" "),_c('p')])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d9e7cfce", __vue__options__)
  } else {
    hotAPI.reload("data-v-d9e7cfce", __vue__options__)
  }
})()}
});

;require.register("components/common/dialogs/confirm.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      confirmActive: false
    };
  },

  props: {
    theme: {
      type: String,
      required: false,
      default: 'is-default'
    },
    actionIcon: {
      type: String,
      required: false
    },
    actionText: {
      type: String,
      required: false,
      default: ''
    },
    dialogTitle: {
      type: String,
      required: false
    },
    dialogText: {
      type: String,
      requred: false
    },
    confirmText: {
      type: String,
      required: false,
      default: ''
    },
    confirmIcon: {
      type: String,
      required: false
    }
  },
  methods: {
    close: function close() {
      this.confirmActive = false;
      this.$emit('close');
    },
    confirm: function confirm() {
      this.confirmActive = false;
      this.$emit('confirm');
    },
    ask: function ask() {
      this.confirmActive = true;
      this.$emit('ask');
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('button',{staticClass:"button",class:_vm.theme,attrs:{"type":"button"},on:{"click":_vm.ask}},[(_vm.actionIcon)?_c('span',{staticClass:"icon is-small"},[_c('i',{staticClass:"fa",class:_vm.actionIcon})]):_vm._e(),_vm._v("\n    "+_vm._s(_vm.actionText)+"\n  ")]),_vm._v(" "),_c('div',{staticClass:"modal",class:{ 'is-active': _vm.confirmActive }},[_c('div',{staticClass:"modal-background",on:{"click":_vm.close}}),_vm._v(" "),_c('div',{staticClass:"modal-content"},[_c('article',{staticClass:"message is-danger"},[(_vm.dialogTitle)?_c('div',{staticClass:"message-header"},[_c('p',[_vm._v(_vm._s(_vm.dialogTitle))])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"message-body"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('div',{},[_vm._v("\n                "+_vm._s(_vm.dialogText)+"\n              ")]),_vm._v(" "),_c('div',{},[_c('button',{staticClass:"button is-danger",attrs:{"type":"button","name":"button"},on:{"click":_vm.confirm}},[(_vm.confirmIcon)?_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa",class:_vm.confirmIcon})]):_vm._e(),_vm._v("\n                  "+_vm._s(_vm.confirmText)+"\n                ")])])])]),_vm._v(" "),_c('div',{})])])]),_vm._v(" "),_c('button',{staticClass:"modal-close",on:{"click":_vm.close}})])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49278945", __vue__options__)
  } else {
    hotAPI.reload("data-v-49278945", __vue__options__)
  }
})()}
});

;require.register("components/common/dialogs/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _confirm = require('./confirm.vue');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Confirm: _confirm2.default
};

});

require.register("components/common/forms/fields/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vbField = require('./vb-field.vue');

var _vbField2 = _interopRequireDefault(_vbField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  vbField: _vbField2.default
};

});

require.register("components/common/forms/fields/vb-field.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    leftIcon: {
      type: String,
      required: false
    },
    rightIcon: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    help: {
      type: Object,
      required: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"control",class:{'has-icons-left': _vm.leftIcon, 'has-icons-right': _vm.rightIcon}},[_vm._t("field"),_vm._v(" "),(_vm.leftIcon)?_c('span',{staticClass:"icon is-small is-left"},[_c('i',{staticClass:"fa",class:_vm.leftIcon})]):_vm._e(),_vm._v(" "),(_vm.rightIcon)?_c('span',{staticClass:"icon is-small is-right"},[_c('i',{staticClass:"fa",class:_vm.rightIcon})]):_vm._e()],2),_vm._v(" "),(_vm.help && _vm.help.show)?_c('p',{staticClass:"help",class:_vm.help.level},[_vm._v(_vm._s(_vm.help.message))]):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52a04178", __vue__options__)
  } else {
    hotAPI.reload("data-v-52a04178", __vue__options__)
  }
})()}
});

;require.register("components/common/lists/column-list-item.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    item: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    shownFields: {
      type: Array,
      required: true
    },
    detailState: {
      type: String,
      required: true
    }
  },
  computed: {
    header: function header() {
      return this.title || this.item._id;
    }
  },
  created: function created() {
    console.log(this.shownFields);
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"notification"},[_c('div',{staticClass:"columns"},[(_vm.icon)?_c('div',{staticClass:"column is-2"},[_c('span',{staticClass:"icon is-large"},[_c('i',{staticClass:"fa",class:_vm.icon})])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"column"},[_c('p',{staticClass:"title is-3"},[_c('router-link',{attrs:{"to":{ name: _vm.detailState, params: { id: _vm.item._id }}}},[_vm._v(_vm._s(_vm.header))])],1),_vm._v(" "),_vm._l((_vm.shownFields),function(field){return _c('p',{},[_c('strong',[_vm._v(_vm._s(_vm.$t('events.common.' + field)))]),_vm._v(" "+_vm._s(_vm.item[field])+"\n      ")])})],2)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33e8878c", __vue__options__)
  } else {
    hotAPI.rerender("data-v-33e8878c", __vue__options__)
  }
})()}
});

;require.register("components/common/lists/column-list.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    title: {
      type: String,
      required: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero"},[(_vm.title)?_c('h1',{staticClass:"title is-2"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_vm._t("filters"),_vm._v(" "),_c('div',{staticClass:"columns is-multiline is-narrow"},[_vm._t("items")],2)],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71fac9e4", __vue__options__)
  } else {
    hotAPI.reload("data-v-71fac9e4", __vue__options__)
  }
})()}
});

;require.register("components/common/lists/list-paginator.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    minRecord: {
      type: Number,
      required: false,
      default: 0
    },
    maxRecord: {
      type: Number,
      required: false,
      default: 0
    },
    hasPrevious: {
      type: Boolean,
      required: false,
      default: false
    },
    hasNext: {
      type: Boolean,
      required: false,
      default: false
    },
    total: {
      type: Number,
      required: false,
      default: 0
    }

  },
  methods: {
    next: function next() {
      this.$emit('next');
    },
    previous: function previous() {
      this.$emit('previous');
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero is-small is-light"},[_c('div',{staticClass:"hero-body"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',{staticClass:"level-item"},[_c('p',{staticClass:"subtitle is-5"},[_vm._v("Mostrando del "),_c('strong',[_vm._v(_vm._s(_vm.minRecord))]),_vm._v(" al "),_c('strong',[_vm._v(_vm._s(_vm.maxRecord))]),_vm._v(" de "),_c('strong',[_vm._v(_vm._s(_vm.total))])])])]),_vm._v(" "),_c('div',{staticClass:"level-right"},[_c('div',{staticClass:"level-item"},[_c('button',{staticClass:"button is-info",attrs:{"type":"button","name":"previous","disabled":!_vm.hasPrevious},on:{"click":_vm.previous}},[_vm._v("Anterior")])]),_vm._v(" "),_c('div',{staticClass:"level-item"},[_c('button',{staticClass:"button is-info",attrs:{"type":"button","name":"next","disabled":!_vm.hasNext},on:{"click":_vm.next}},[_vm._v("Siguiente")])])])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ba8caa7a", __vue__options__)
  } else {
    hotAPI.reload("data-v-ba8caa7a", __vue__options__)
  }
})()}
});

;require.register("components/common/lists/list-select-filter.vue", function(exports, require, module) {
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d5f049ca", __vue__options__)
  } else {
    hotAPI.reload("data-v-d5f049ca", __vue__options__)
  }
})()}
});

;require.register("components/common/lists/tiled-list.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    title: {
      type: String,
      required: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[(_vm.title)?_c('h1',{staticClass:"title is-2"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"tile is-parent is-multiline"},[_vm._t("items")],2)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ec14d694", __vue__options__)
  } else {
    hotAPI.reload("data-v-ec14d694", __vue__options__)
  }
})()}
});

;require.register("components/common/mixins/data-list-mixin.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  computed: {
    hasNext: function hasNext() {
      return this.skip + this.limit < this.total;
    },
    hasPrevious: function hasPrevious() {
      return this.skip - this.limit >= 0;
    },
    minRecord: function minRecord() {
      return this.skip + 1;
    },
    maxRecord: function maxRecord() {
      return this.skip + this.items.length;
    }
  },
  methods: {
    loadItems: function loadItems(filters) {
      var _this = this;

      var innerFilters = {
        $skip: this.skip,
        $limit: this.limit
      };
      if (filters) {
        Object.assign(innerFilters, filters);
      }
      this.dataSource.find(innerFilters).then(function (result) {
        _this.items = result.data.data;
        _this.total = result.data.total;
        _this.limit = result.data.limit;
      }).catch(function (error) {/* Do nothing. Errors are handled globally */});
    },

    /**
     * [next description]
     * @param  {Object} filters An optional parameter containing all custom
     * filters for a concrete data list.
     * @return Function         [description]
     */
    next: function next(filters) {
      if (this.hasNext) {
        this.skip += this.limit;
        this.loadItems(filters);
      }
    },
    previous: function previous(filters) {
      if (this.hasPrevious) {
        this.skip -= this.limit;
        this.loadItems(filters);
      }
    }
  },
  created: function created() {
    this.loadItems();
  }
};

});

require.register("components/common/transitions/fade-in-transition.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _genericTransition = require('./generic-transition');

var _genericTransition2 = _interopRequireDefault(_genericTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _genericTransition2.default('fadeIn', 'fadeIn');

});

require.register("components/common/transitions/generic-transition.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericTransition = function GenericTransition(transitionType, name) {
  _classCallCheck(this, GenericTransition);

  this.functional = true, this.transitionType = transitionType;
  this.name = name;
  var that = this;
  this.render = function (createElement, context) {

    var data = {
      props: {
        name: that.name,
        enterActiveClass: 'animated ' + that.transitionType
      },
      on: {
        beforeEnter: function beforeEnter(el) {},
        afterEnter: function afterEnter(el) {}
      }
    };
    return createElement('transition', data, context.children);
  };
};

exports.default = GenericTransition;

});

require.register("components/contacts/Create.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fields = require('../common/forms/fields');

var _fields2 = _interopRequireDefault(_fields);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _vuex = require('vuex');

var _countriesList = require('countries-list');

var _countriesList2 = _interopRequireDefault(_countriesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    id: {
      required: false,
      type: String
    }
  },
  components: {
    'vb-field': _fields2.default.vbField
  },
  data: function data() {
    return {
      instance: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        city: '',
        country: ''
      },
      countries: _countriesList2.default.countries
    };
  },
  created: function created() {
    var _this = this;

    if (this.id) {
      _api2.default.contacts.get(this.id).then(function (result) {
        _this.instance = result.data;
      }).catch(function (error) {});
    }
  },

  methods: _extends({}, (0, _vuex.mapActions)(['addMessage']), {
    save: function save() {
      var _this2 = this;

      this.$validator.validateAll().then(function (success) {
        if (_this2.instance._id) {
          _this2.update();
        } else {
          _this2.create();
        }
      }).catch(function (error) {});
    },
    create: function create() {
      var _this3 = this;

      _api2.default.contacts.create(this.instance).then(function (result) {
        _this3.addMessage({
          text: 'Contact created successfully',
          type: 'success'
        });
        _this3.$router.push({ name: 'admin.contacts' });
      }).catch(function (error) {});
    },
    update: function update() {
      var _this4 = this;

      _api2.default.contacts.update(this.instance._id, this.instance).then(function (result) {
        _this4.addMessage({
          text: 'Contact updated successfully',
          type: 'success'
        });
        _this4.$router.push({ name: 'admin.contacts' });
      }).catch(function (error) {});
    },
    cancel: function cancel() {
      this.$router.push({ name: 'admin.contacts' });
    }
  })

};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero"},[_c('h1',{staticClass:"title is-2"},[_vm._v(_vm._s(_vm.$t('contacts.create.title' )))]),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();_vm.save($event)}}},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.firstName'),"help":{show: _vm.errors.has('firstName'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.firstName),expression:"instance.firstName"},{name:"validate",rawName:"v-validate:firstName.initial",value:('required'),expression:"'required'",arg:"firstName",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('firstName')},attrs:{"type":"text","name":"firstName","placeholder":"John"},domProps:{"value":(_vm.instance.firstName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.firstName=$event.target.value}},slot:"field"})])],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.lastName'),"help":{show: _vm.errors.has('lastName'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.lastName),expression:"instance.lastName"},{name:"validate",rawName:"v-validate:lastName.initial",value:('required'),expression:"'required'",arg:"lastName",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('lastName')},attrs:{"type":"text","placeholder":"Snow","name":"lastName"},domProps:{"value":(_vm.instance.lastName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.lastName=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.email'),"help":{show: _vm.errors.has('email'), message: _vm.$t('fields.invalidEmail'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.email),expression:"instance.email"},{name:"validate",rawName:"v-validate:email.initial",value:('required|email'),expression:"'required|email'",arg:"email",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('email')},attrs:{"type":"text","placeholder":"someone@something.com","name":"email"},domProps:{"value":(_vm.instance.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.email=$event.target.value}},slot:"field"})])],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.phone')}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.phone),expression:"instance.phone"}],staticClass:"input",attrs:{"type":"text","placeholder":"+1555555555"},domProps:{"value":(_vm.instance.phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.phone=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.age')}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.age),expression:"instance.age"}],staticClass:"input",attrs:{"type":"number","min":"0","placeholder":"25"},domProps:{"value":(_vm.instance.age)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.age=$event.target.value},"blur":function($event){_vm.$forceUpdate()}},slot:"field"})])],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.city')}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.city),expression:"instance.city"}],staticClass:"input",attrs:{"type":"text","placeholder":"New York"},domProps:{"value":(_vm.instance.city)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.city=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('contacts.common.country')}},[_c('span',{staticClass:"select",slot:"field"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.country),expression:"instance.country"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.instance.country=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{"value":""}},[_vm._v("-- "+_vm._s(_vm.$t('contacts.common.country'))+" --")]),_vm._v(" "),_vm._l((_vm.countries),function(value,key){return _c('option',{domProps:{"value":key}},[_vm._v(_vm._s(value.name))])})],2)])])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-offset-one-quarter is-clearfix is-half"},[_c('button',{staticClass:"button is-primary ",attrs:{"type":"submit","name":"submit"}},[_vm._v(_vm._s(_vm.$t('common.save')))]),_vm._v(" "),_c('button',{staticClass:"button is-warning is-pulled-right",attrs:{"type":"button","name":"cancel"},on:{"click":_vm.cancel}},[_vm._v(_vm._s(_vm.$t('common.cancel')))])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-056ba6ca", __vue__options__)
  } else {
    hotAPI.reload("data-v-056ba6ca", __vue__options__)
  }
})()}
});

;require.register("components/contacts/Index.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fadeInTransition = require('../common/transitions/fade-in-transition');

var _fadeInTransition2 = _interopRequireDefault(_fadeInTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'contacts',
  components: {
    'fade-in-transition': _fadeInTransition2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fade-in-transition',[_c('router-view')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1767ee83", __vue__options__)
  } else {
    hotAPI.reload("data-v-1767ee83", __vue__options__)
  }
})()}
});

;require.register("components/contacts/List.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _columnList = require('../common/lists/column-list.vue');

var _columnList2 = _interopRequireDefault(_columnList);

var _listPaginator = require('../common/lists/list-paginator.vue');

var _listPaginator2 = _interopRequireDefault(_listPaginator);

var _dataListMixin = require('../common/mixins/data-list-mixin');

var _dataListMixin2 = _interopRequireDefault(_dataListMixin);

var _contactListItem = require('./contact-list-item.vue');

var _contactListItem2 = _interopRequireDefault(_contactListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'contactList',
  mixins: [_dataListMixin2.default],
  data: function data() {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 15,
      filters: {
        englishLevel: '',
        email: '',
        city: ''
      },
      dataSource: _api2.default.contacts
    };
  },

  components: {
    'column-list': _columnList2.default,
    'list-paginator': _listPaginator2.default,
    'contact-list-item': _contactListItem2.default
  },
  methods: {
    search: function search() {
      this.loadItems(this.cleanFilters);
    }
  },
  computed: {
    cleanFilters: function cleanFilters() {
      var f = {};
      if (this.filters.email != '') {
        f.email = {
          $search: this.filters.email
        };
      }
      if (this.filters.city != '') {
        f.city = {
          $search: this.filters.city
        };
      }
      return f;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-list',{attrs:{"title":_vm.$t('contacts.common.contacts')}},[_c('div',{slot:"filters"},[_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',{staticClass:"level-item"},[_c('div',{staticClass:"field has-addons"},[_c('p',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.email),expression:"filters.email"}],staticClass:"input",attrs:{"type":"text","placeholder":_vm.$t('contacts.list.searchEmail')},domProps:{"value":(_vm.filters.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filters.email=$event.target.value}}})]),_vm._v(" "),_c('p',{staticClass:"control"},[_c('a',{staticClass:"button is-info",on:{"click":_vm.search}},[_vm._v("\n                "+_vm._s(_vm.$t('common.search'))+"\n              ")])])])]),_vm._v(" "),_c('div',{staticClass:"level-item"},[_c('div',{staticClass:"field has-addons"},[_c('p',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.city),expression:"filters.city"}],staticClass:"input",attrs:{"type":"text","placeholder":_vm.$t('contacts.list.searchCity')},domProps:{"value":(_vm.filters.city)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filters.city=$event.target.value}}})]),_vm._v(" "),_c('p',{staticClass:"control"},[_c('a',{staticClass:"button is-info",on:{"click":_vm.search}},[_vm._v("\n                "+_vm._s(_vm.$t('common.search'))+"\n              ")])])])])]),_vm._v(" "),_c('div',{staticClass:"level-right"},[_c('div',{staticClass:"level-item"},[_c('router-link',{staticClass:"button is-success",attrs:{"to":{name: 'admin.contacts.new'},"title":_vm.$t('contacts.common.new')}},[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-plus"})])])],1)])]),_vm._v(" "),_c('list-paginator',{attrs:{"max-record":_vm.maxRecord,"total":_vm.total,"min-record":_vm.minRecord,"has-next":_vm.hasNext,"has-previous":_vm.hasPrevious},on:{"next":_vm.next,"previous":_vm.previous}}),_vm._v(" "),_c('br')],1),_vm._v(" "),_vm._l((_vm.items),function(item){return _c('div',{staticClass:"column is-4",slot:"items"},[_c('contact-list-item',{attrs:{"item":item}})],1)})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1062b0fd", __vue__options__)
  } else {
    hotAPI.reload("data-v-1062b0fd", __vue__options__)
  }
})()}
});

;require.register("components/contacts/contact-list-item.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"content"},[_c('p',{staticClass:"title is-4"},[_c('router-link',{attrs:{"to":{ name: 'admin.contacts.detail', params: { id: _vm.item._id}}}},[_vm._v("\n          "+_vm._s(_vm.item.firstName)+" "+_vm._s(_vm.item.lastName)+"\n        ")])],1),_vm._v(" "),_c('p',{staticClass:"subtitle is-6"},[_vm._v(_vm._s(_vm.item.email))])]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('span',{staticClass:"tag is-warning"},[_vm._v(_vm._s(_vm.item.phone))]),_vm._v(" "),_c('span',{staticClass:"tag is-primary"},[_vm._v(_vm._s(_vm.item.age))])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c05be774", __vue__options__)
  } else {
    hotAPI.reload("data-v-c05be774", __vue__options__)
  }
})()}
});

;require.register("components/contacts/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Index = require('./Index.vue');

var _Index2 = _interopRequireDefault(_Index);

var _List = require('./List.vue');

var _List2 = _interopRequireDefault(_List);

var _Create = require('./Create.vue');

var _Create2 = _interopRequireDefault(_Create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: 'contacts',
  component: _Index2.default,
  meta: {
    loginRequired: true
  },
  children: [{
    name: 'admin.contacts',
    path: '',
    component: _List2.default,
    meta: {
      loginRequired: true,
      title: 'Contacts'
    }
  }, {
    name: 'admin.contacts.new',
    path: 'new',
    component: _Create2.default,
    meta: {
      loginRequired: true,
      title: 'New Contact'
    }
  }, {
    name: 'admin.contacts.detail',
    path: ':id',
    component: _Create2.default,
    props: true,
    meta: {
      loginRequired: true,
      title: 'Contact Details'
    }
  }]
}];

});

require.register("components/error.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'Error',
    data: function data() {
        return {
            path: ''
        };
    },
    created: function created() {
        var route = this.$route;

        this.path = route.path;
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"error"},[_c('h1',[_vm._v("Page not found")]),_vm._v(" "),_c('p',[_vm._v("It would appear that "),_c('em',[_vm._v(_vm._s(_vm.path))]),_vm._v(" could not be found.")])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1343960b", __vue__options__)
  } else {
    hotAPI.reload("data-v-1343960b", __vue__options__)
  }
})()}
});

;require.register("components/events/Create.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fields = require('../common/forms/fields');

var _fields2 = _interopRequireDefault(_fields);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _vuex = require('vuex');

var _countriesList = require('countries-list');

var _countriesList2 = _interopRequireDefault(_countriesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    id: {
      required: false,
      type: String
    }
  },
  components: {
    'vb-field': _fields2.default.vbField
  },
  data: function data() {
    return {
      instance: {
        title: '',
        description: '',
        startDate: '',
        endDate: ''
      }
    };
  },
  created: function created() {
    var _this = this;

    if (this.id) {
      _api2.default.events.get(this.id).then(function (result) {
        _this.instance = result.data;
      }).catch(function (error) {});
    }
  },

  methods: _extends({}, (0, _vuex.mapActions)(['addMessage']), {
    save: function save() {
      var _this2 = this;

      this.$validator.validateAll().then(function (success) {
        if (_this2.instance._id) {
          _this2.update();
        } else {
          _this2.create();
        }
      }).catch(function (error) {});
    },
    create: function create() {
      var _this3 = this;

      _api2.default.events.create(this.instance).then(function (result) {
        _this3.addMessage({
          text: 'Event created successfully',
          type: 'success'
        });
        _this3.$router.push({ name: 'admin.events' });
      }).catch(function (error) {});
    },
    update: function update() {
      var _this4 = this;

      _api2.default.events.update(this.instance._id, this.instance).then(function (result) {
        _this4.addMessage({
          text: 'Event updated successfully',
          type: 'success'
        });
        _this4.$router.push({ name: 'admin.events' });
      }).catch(function (error) {});
    },
    cancel: function cancel() {
      this.$router.push({ name: 'admin.events' });
    }
  })

};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero"},[_c('h1',{staticClass:"title is-2"},[_vm._v(_vm._s(_vm.$t('events.create.title' )))]),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();_vm.save($event)}}},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('events.common.title'),"help":{show: _vm.errors.has('title'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.title),expression:"instance.title"},{name:"validate",rawName:"v-validate:event.initial",value:('required'),expression:"'required'",arg:"event",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('event')},attrs:{"type":"text","name":"title","placeholder":"Some event"},domProps:{"value":(_vm.instance.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.title=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('events.common.startDate'),"help":{show: _vm.errors.has('startDate'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.startDate),expression:"instance.startDate"},{name:"validate",rawName:"v-validate:startDate.initial",value:('required'),expression:"'required'",arg:"startDate",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('startDate')},attrs:{"type":"text","placeholder":"27/1/2017","name":"startDate"},domProps:{"value":(_vm.instance.startDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.startDate=$event.target.value}},slot:"field"})])],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('events.common.endDate'),"help":{show: _vm.errors.has('endDate'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.endDate),expression:"instance.endDate"},{name:"validate",rawName:"v-validate:endDate.initial",value:('required'),expression:"'required'",arg:"endDate",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('endDate')},attrs:{"type":"text","placeholder":"27/1/2017","name":"endDate"},domProps:{"value":(_vm.instance.endDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.endDate=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('events.common.description'),"help":{show: true, message: _vm.$t('events.create.descriptionHelp'), level: 'is-primary'}}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.description),expression:"instance.description"}],staticClass:"textarea",attrs:{"type":"text","placeholder":"Snow","name":"description"},domProps:{"value":(_vm.instance.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.description=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-offset-one-quarter is-clearfix is-half"},[_c('button',{staticClass:"button is-primary ",attrs:{"type":"submit","name":"submit"}},[_vm._v(_vm._s(_vm.$t('common.save')))]),_vm._v(" "),_c('button',{staticClass:"button is-warning is-pulled-right",attrs:{"type":"button","name":"cancel"},on:{"click":_vm.cancel}},[_vm._v(_vm._s(_vm.$t('common.cancel')))])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-166afa56", __vue__options__)
  } else {
    hotAPI.rerender("data-v-166afa56", __vue__options__)
  }
})()}
});

;require.register("components/events/Index.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fadeInTransition = require('../common/transitions/fade-in-transition');

var _fadeInTransition2 = _interopRequireDefault(_fadeInTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    'fade-in-transition': _fadeInTransition2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fade-in-transition',[_c('router-view')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8722dee", __vue__options__)
  } else {
    hotAPI.reload("data-v-a8722dee", __vue__options__)
  }
})()}
});

;require.register("components/events/List.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _columnList = require('../common/lists/column-list.vue');

var _columnList2 = _interopRequireDefault(_columnList);

var _columnListItem = require('../common/lists/column-list-item.vue');

var _columnListItem2 = _interopRequireDefault(_columnListItem);

var _listPaginator = require('../common/lists/list-paginator.vue');

var _listPaginator2 = _interopRequireDefault(_listPaginator);

var _dataListMixin = require('../common/mixins/data-list-mixin');

var _dataListMixin2 = _interopRequireDefault(_dataListMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'usersList',
  components: {
    'column-list': _columnList2.default,
    'list-paginator': _listPaginator2.default,
    'column-list-item': _columnListItem2.default

  },
  data: function data() {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 20,
      filters: {
        title: ''
      },
      dataSource: _api2.default.events
    };
  },

  mixins: [_dataListMixin2.default],
  methods: {
    search: function search() {
      this.loadItems(this.cleanFilters);
    }
  },
  computed: {
    cleanFilters: function cleanFilters() {
      var f = {};
      if (this.filters.title != '') {
        f.title = {
          $search: this.filters.title
        };
      }
      return f;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-list',{attrs:{"title":"Events"}},[_c('div',{slot:"filters"},[_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',{staticClass:"level-item"},[_c('div',{staticClass:"field has-addons"},[_c('p',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.title),expression:"filters.title"}],staticClass:"input",attrs:{"type":"text","placeholder":_vm.$t('events.list.searchTitle')},domProps:{"value":(_vm.filters.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filters.title=$event.target.value}}})]),_vm._v(" "),_c('p',{staticClass:"control"},[_c('a',{staticClass:"button is-info",on:{"click":_vm.search}},[_vm._v("\n                "+_vm._s(_vm.$t('common.search'))+"\n              ")])])])])]),_vm._v(" "),_c('div',{staticClass:"level-right"},[_c('div',{staticClass:"level-item"},[_c('router-link',{staticClass:"button is-success",attrs:{"to":{name: 'admin.events.create'},"title":_vm.$t('events.common.new')}},[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-plus"})])])],1)])]),_vm._v(" "),_c('list-paginator',{attrs:{"max-record":_vm.maxRecord,"total":_vm.total,"min-record":_vm.minRecord,"has-next":_vm.hasNext,"has-previous":_vm.hasPrevious},on:{"next":_vm.next,"previous":_vm.previous}}),_vm._v(" "),_c('br')],1),_vm._v(" "),_vm._l((_vm.items),function(item){return _c('div',{staticClass:"column is-6",slot:"items"},[_c('column-list-item',{attrs:{"item":item,"title":item.title,"icon":"fa-calendar","shown-fields":['startDate','endDate'],"detail-state":"admin.events.detail"}})],1)})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ad16492", __vue__options__)
  } else {
    hotAPI.rerender("data-v-7ad16492", __vue__options__)
  }
})()}
});

;require.register("components/events/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Index = require('./Index.vue');

var _Index2 = _interopRequireDefault(_Index);

var _Create = require('./Create.vue');

var _Create2 = _interopRequireDefault(_Create);

var _List = require('./List.vue');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: 'events',
  component: _Index2.default,
  meta: {
    loginRequired: true
  },
  children: [{
    name: 'admin.events',
    component: _List2.default,
    path: '',
    meta: {
      loginRerequired: true
    }
  }, {
    name: 'admin.events.create',
    component: _Create2.default,
    path: 'create',
    meta: {
      loginRequired: true
    }
  }, {
    name: 'admin.events.detail',
    component: _Create2.default,
    path: ':id',
    props: true,
    meta: {
      loginRequired: true
    }
  }]
}];

});

require.register("components/home/Home.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'adminHome'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('h1',[_vm._v("Admin home")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c5ba332", __vue__options__)
  } else {
    hotAPI.reload("data-v-7c5ba332", __vue__options__)
  }
})()}
});

;require.register("components/home/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = require('./Home.vue');

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '',
  component: _Home2.default,
  name: 'admin.home',
  meta: { loginRequired: true }
}];

});

require.register("components/layout/AnonymousLayout.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'AnonymousLayout'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_vm._t("content")],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6301287f", __vue__options__)
  } else {
    hotAPI.reload("data-v-6301287f", __vue__options__)
  }
})()}
});

;require.register("components/layout/DefaultLayout.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sideMenu = require('./partials/side-menu.vue');

var _sideMenu2 = _interopRequireDefault(_sideMenu);

var _topHeader = require('./partials/top-header.vue');

var _topHeader2 = _interopRequireDefault(_topHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'DefaultLayout',
  components: {
    'side-menu': _sideMenu2.default,
    'top-header': _topHeader2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('top-header'),_vm._v(" "),_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns is-mobile"},[_c('div',{staticClass:"column is-2-tablet is-3-mobile"},[_c('side-menu')],1),_vm._v(" "),_c('div',{staticClass:"column"},[_vm._t("content")],2)])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10956d53", __vue__options__)
  } else {
    hotAPI.reload("data-v-10956d53", __vue__options__)
  }
})()}
});

;require.register("components/layout/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AnonymousLayout = require('./AnonymousLayout.vue');

var _AnonymousLayout2 = _interopRequireDefault(_AnonymousLayout);

var _DefaultLayout = require('./DefaultLayout.vue');

var _DefaultLayout2 = _interopRequireDefault(_DefaultLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  AnonymousLayout: _AnonymousLayout2.default,
  DefaultLayout: _DefaultLayout2.default
};

});

require.register("components/layout/partials/side-menu.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'adminSideMenu'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"menu aside"},[_c('p'),_vm._v(" "),_c('p',{staticClass:"menu-label"},[_vm._v("\n    "+_vm._s(_vm.$t('sidebar.users'))+"\n  ")]),_vm._v(" "),_c('ul',{staticClass:"menu-list"},[_c('li',[_c('router-link',{attrs:{"to":{ name: 'admin.users' }}},[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-users"})]),_vm._v(" "+_vm._s(_vm.$t('sidebar.users')))])],1)]),_vm._v(" "),_c('p',{staticClass:"menu-label"},[_vm._v(_vm._s(_vm.$t("sidebar.events")))]),_vm._v(" "),_c('ul',{staticClass:"menu-list"},[_c('li',[_c('router-link',{attrs:{"to":{ name: 'admin.contacts' }}},[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-phone"})]),_vm._v(" "+_vm._s(_vm.$t('sidebar.contacts')))])],1),_vm._v(" "),_c('li',[_c('router-link',{attrs:{"to":{name: 'admin.events'}}},[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-calendar"})]),_vm._v(" "+_vm._s(_vm.$t('sidebar.events')))])],1),_vm._v(" "),_c('li',[_c('router-link',{attrs:{"to":{ name: 'admin.registrations' }}},[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-id-card"})]),_vm._v(" "+_vm._s(_vm.$t('sidebar.registrations')))])],1)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a3d0660", __vue__options__)
  } else {
    hotAPI.rerender("data-v-0a3d0660", __vue__options__)
  }
})()}
});

;require.register("components/layout/partials/top-header.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      isOpen: false,
      title: _config2.default.appTitle
    };
  },

  methods: {
    toggleMenu: function toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"nav has-shadow"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"nav-left"},[_c('router-link',{staticClass:"nav-item title is-3",attrs:{"to":{ name: 'admin.home' }}},[_vm._v("\n        "+_vm._s(_vm.title)+" - Admin Panel\n      ")])],1),_vm._v(" "),_c('span',{staticClass:"nav-toggle",on:{"click":_vm.toggleMenu}},[_c('span'),_vm._v(" "),_c('span'),_vm._v(" "),_c('span')]),_vm._v(" "),_c('div',{staticClass:"nav-right nav-menu",class:{ 'is-active': _vm.isOpen },on:{"click":_vm.toggleMenu}},[_c('router-link',{staticClass:"nav-item is-tab",attrs:{"to":{ name: 'admin.users.detail', params: { id: '231'} }}},[_vm._v("\n        Profile\n      ")]),_vm._v(" "),_c('router-link',{staticClass:"nav-item is-tab",attrs:{"to":{ name: 'admin.users.detail', params: {id: '131'} }}},[_vm._v("\n        Go to Site\n      ")])],1)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6336f24a", __vue__options__)
  } else {
    hotAPI.rerender("data-v-6336f24a", __vue__options__)
  }
})()}
});

;require.register("components/registrations/Detail.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _registrationInstanceMixin = require('./registration-instance-mixin');

var _registrationInstanceMixin2 = _interopRequireDefault(_registrationInstanceMixin);

var _detailObject = require('../common/detail/detail-object.vue');

var _detailObject2 = _interopRequireDefault(_detailObject);

var _contentSection = require('../common/detail/content-section.vue');

var _contentSection2 = _interopRequireDefault(_contentSection);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _vuex = require('vuex');

var _fields = require('../common/detail/fields');

var _fields2 = _interopRequireDefault(_fields);

var _dialogs = require('../common/dialogs');

var _dialogs2 = _interopRequireDefault(_dialogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    'detail-object': _detailObject2.default,
    'content-section': _contentSection2.default,
    'text-field': _fields2.default.TextField,
    'tag-list': _fields2.default.TagList,
    'checkbox-field': _fields2.default.Checkbox,
    'delete-confirm': _dialogs2.default.Confirm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [_registrationInstanceMixin2.default],
  data: function data() {
    return {
      item: {},
      confirmDelete: false,
      deleteDialog: {
        title: 'Confirma',
        text: '¿Realmente querés borrar este Registro? Esta acción no puede ser deshecha',
        confirmText: 'Si, Borrar'
      }
    };
  },
  created: function created() {
    var _this = this;

    _api2.default.registrations.get(this.id).then(function (result) {
      _this.item = result.data;
    }).catch(function (error) {});
  },

  computed: {
    createdAt: function createdAt() {
      return (0, _moment2.default)(this.item.createdAt).format('DD/MM/YYYY hh:mm');
    }
  },
  methods: _extends({}, (0, _vuex.mapActions)(['addMessage']), {
    doDelete: function doDelete() {
      var _this2 = this;

      _api2.default.registrations.remove(this.id).then(function (result) {
        _this2.addMessage({
          text: 'El registro ' + _this2.id + ' ha sido borrado exitosamente',
          type: 'success'
        });
        _this2.$router.push({ name: 'admin.registrations' });
      }).catch(function (error) {});
    }
  })
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('detail-object',{attrs:{"title":_vm.item.name,"subtitle":"Detalles del registro"}},[_c('div',{staticClass:"level-item",attrs:{"title":"Fecha de Registro"},slot:"toolbar-items"},[_c('h2',{staticClass:"subtitle is-5"},[_c('strong',[_c('i',{staticClass:"fa fa-calendar"})]),_vm._v(" "+_vm._s(_vm.createdAt))])]),_vm._v(" "),_c('div',{staticClass:"level-item",slot:"toolbar-items"},[_c('delete-confirm',{attrs:{"theme":"is-danger","action-icon":"fa-trash","dialog-title":_vm.deleteDialog.title,"dialog-text":_vm.deleteDialog.text,"confirm-text":_vm.deleteDialog.confirmText},on:{"confirm":_vm.doDelete}})],1),_vm._v(" "),_c('content-section',{attrs:{"title":"Datos personales"},slot:"content-sections"},[_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Nombre","text":_vm.item.name}})],1),_vm._v(" "),_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Email","text":_vm.item.email}})],1),_vm._v(" "),_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Edad","text":_vm.item.age}})],1),_vm._v(" "),_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Ciudad","text":_vm.item.city}})],1),_vm._v(" "),_c('div',{staticClass:"column is-4",slot:"fields"},[_c('checkbox-field',{attrs:{"label":"Desde su ciudad?","value":_vm.item.remote == 'Si',"legend":_vm.item.remote}})],1)]),_vm._v(" "),_c('content-section',{attrs:{"title":"Educación"},slot:"content-sections"},[_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Universidad","text":_vm.item.university}})],1),_vm._v(" "),_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Año/Semestre","text":_vm.item.coursingYear}})],1),_vm._v(" "),_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Inglés","text":_vm.item.englishLevel}})],1)]),_vm._v(" "),_c('content-section',{attrs:{"title":"Datos técnicos"},slot:"content-sections"},[_c('div',{staticClass:"column is-4",slot:"fields"},[_c('text-field',{attrs:{"label":"Desarrollo o Testing?","text":_vm.item.interest}})],1),_vm._v(" "),_c('div',{staticClass:"column",slot:"fields"},[_c('tag-list',{attrs:{"label":"Lenguajes","tags":_vm.languageArray,"level":"is-warning"}})],1)])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02509413", __vue__options__)
  } else {
    hotAPI.reload("data-v-02509413", __vue__options__)
  }
})()}
});

;require.register("components/registrations/Index.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fadeInTransition = require('../common/transitions/fade-in-transition');

var _fadeInTransition2 = _interopRequireDefault(_fadeInTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'registrations',
  components: {
    'fade-in-transition': _fadeInTransition2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fade-in-transition',[_c('router-view')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55ffeb80", __vue__options__)
  } else {
    hotAPI.reload("data-v-55ffeb80", __vue__options__)
  }
})()}
});

;require.register("components/registrations/List.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _columnList = require('../common/lists/column-list.vue');

var _columnList2 = _interopRequireDefault(_columnList);

var _listPaginator = require('../common/lists/list-paginator.vue');

var _listPaginator2 = _interopRequireDefault(_listPaginator);

var _dataListMixin = require('../common/mixins/data-list-mixin');

var _dataListMixin2 = _interopRequireDefault(_dataListMixin);

var _registrationListItem = require('./registration-list-item.vue');

var _registrationListItem2 = _interopRequireDefault(_registrationListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'registrationsList',
  mixins: [_dataListMixin2.default],
  data: function data() {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 15,
      filters: {
        englishLevel: '',
        email: '',
        city: ''
      },
      dataSource: _api2.default.registrations
    };
  },

  components: {
    'column-list': _columnList2.default,
    'list-paginator': _listPaginator2.default,
    'registration-list-item': _registrationListItem2.default
  },
  methods: {
    search: function search() {
      this.loadItems(this.cleanFilters);
    }
  },
  computed: {
    cleanFilters: function cleanFilters() {
      var f = {};
      if (this.filters.englishLevel != '') {
        f.englishLevel = this.filters.englishLevel;
      }
      if (this.filters.email != '') {
        f.email = {
          $search: this.filters.email
        };
      }
      if (this.filters.city != '') {
        f.city = {
          $search: this.filters.city
        };
      }
      return f;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-list',{attrs:{"title":"Registros"}},[_c('div',{slot:"filters"},[_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',{staticClass:"level-item"},[_c('div',{staticClass:"field has-addons"},[_c('p',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.email),expression:"filters.email"}],staticClass:"input",attrs:{"type":"text","placeholder":"Buscar por email"},domProps:{"value":(_vm.filters.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filters.email=$event.target.value}}})]),_vm._v(" "),_c('p',{staticClass:"control"},[_c('a',{staticClass:"button is-info",on:{"click":_vm.search}},[_vm._v("\n                Buscar\n              ")])])])]),_vm._v(" "),_c('div',{staticClass:"level-item"},[_c('div',{staticClass:"field has-addons"},[_c('p',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.city),expression:"filters.city"}],staticClass:"input",attrs:{"type":"text","placeholder":"Buscar por ciudad"},domProps:{"value":(_vm.filters.city)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filters.city=$event.target.value}}})]),_vm._v(" "),_c('p',{staticClass:"control"},[_c('a',{staticClass:"button is-info",on:{"click":_vm.search}},[_vm._v("\n                Buscar\n              ")])])])])]),_vm._v(" "),_c('div',{staticClass:"level-item"},[_c('div',{staticClass:"field"},[_c('label',{staticClass:"label",attrs:{"for":"englishLevel"}},[_vm._v("Nivel de ingles")]),_vm._v(" "),_c('p',{staticClass:"control"},[_c('span',{staticClass:"select"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.filters.englishLevel),expression:"filters.englishLevel"}],attrs:{"name":"englishLevel"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.filters.englishLevel=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.search]}},[_c('option',{attrs:{"disabled":"","value":""}},[_vm._v("\n                  -- Cualquiera --\n                ")]),_vm._v(" "),_c('option',[_vm._v("No hablo")]),_vm._v(" "),_c('option',[_vm._v("Basico")]),_vm._v(" "),_c('option',[_vm._v("Intermedio")]),_vm._v(" "),_c('option',[_vm._v("Avanzado")])])])])])])]),_vm._v(" "),_c('list-paginator',{attrs:{"max-record":_vm.maxRecord,"total":_vm.total,"min-record":_vm.minRecord,"has-next":_vm.hasNext,"has-previous":_vm.hasPrevious},on:{"next":_vm.next,"previous":_vm.previous}}),_vm._v(" "),_c('br')],1),_vm._v(" "),_vm._l((_vm.items),function(item){return _c('div',{staticClass:"column is-4",slot:"items"},[_c('registration-list-item',{attrs:{"item":item}})],1)})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d2eebf40", __vue__options__)
  } else {
    hotAPI.reload("data-v-d2eebf40", __vue__options__)
  }
})()}
});

;require.register("components/registrations/registration-instance-mixin.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  computed: {
    /**
     * gives us an array of languages from the item's languages field
     * @returns {Array} the list of programming languages
     */
    languageArray: function languageArray() {

      return this.item.languages ? this.item.languages.split(',') : [];
    },

    /**
     * gives us an array limited by the component's maxLanguages property
     */
    shownLanguageArray: function shownLanguageArray() {
      if (this.maxLanguages) {
        return this.languageArray.slice(0, this.maxLanguages);
      } else {
        return this.languageArray;
      }
    }
  }
};

});

require.register("components/registrations/registration-list-item.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registrationInstanceMixin = require('./registration-instance-mixin');

var _registrationInstanceMixin2 = _interopRequireDefault(_registrationInstanceMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      maxLanguages: 3

    };
  },

  mixins: [_registrationInstanceMixin2.default]

};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"content"},[_c('p',{staticClass:"title is-4"},[_c('router-link',{attrs:{"to":{ name: 'admin.registrations.detail', params: { id: _vm.item._id}}}},[_vm._v("\n          "+_vm._s(_vm.item.name || '[Sin nombre]')+"\n        ")])],1),_vm._v(" "),_c('p',{staticClass:"subtitle is-6"},[_vm._v(_vm._s(_vm.item.email))])]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._l((_vm.shownLanguageArray),function(language){return _c('span',[_c('span',{staticClass:"tag is-warning"},[_vm._v(_vm._s(language))]),_vm._v(" \n      ")])}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.maxLanguages < _vm.languageArray.length),expression:"maxLanguages < languageArray.length"}],staticClass:"content is-primary"},[_vm._v("...")])],2)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09b35bf0", __vue__options__)
  } else {
    hotAPI.reload("data-v-09b35bf0", __vue__options__)
  }
})()}
});

;require.register("components/registrations/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Index = require('./Index.vue');

var _Index2 = _interopRequireDefault(_Index);

var _List = require('./List.vue');

var _List2 = _interopRequireDefault(_List);

var _Detail = require('./Detail.vue');

var _Detail2 = _interopRequireDefault(_Detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: 'registrations',
  component: _Index2.default,
  meta: {
    loginRequired: true
  },
  children: [{
    name: 'admin.registrations',
    path: '',
    component: _List2.default,
    meta: {
      loginRequired: true
    }
  }, {
    name: 'admin.registrations.detail',
    path: ':id',
    component: _Detail2.default,
    props: true,
    meta: {
      loginRequired: true
    }
  }]
}];

});

require.register("components/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Main = require('./Main.vue');

var _Main2 = _interopRequireDefault(_Main);

var _routes = require('./home/routes');

var _routes2 = _interopRequireDefault(_routes);

var _routes3 = require('./auth/routes');

var _routes4 = _interopRequireDefault(_routes3);

var _routes5 = require('./users/routes');

var _routes6 = _interopRequireDefault(_routes5);

var _routes7 = require('./registrations/routes');

var _routes8 = _interopRequireDefault(_routes7);

var _routes9 = require('./contacts/routes');

var _routes10 = _interopRequireDefault(_routes9);

var _routes11 = require('./events/routes');

var _routes12 = _interopRequireDefault(_routes11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = [{
  path: '/',
  component: _Main2.default,
  children: [].concat(_toConsumableArray(_routes4.default), _toConsumableArray(_routes6.default), _toConsumableArray(_routes8.default), _toConsumableArray(_routes10.default), _toConsumableArray(_routes12.default), _toConsumableArray(_routes2.default))
}];

});

require.register("components/users/Create.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fields = require('../common/forms/fields');

var _fields2 = _interopRequireDefault(_fields);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _vuex = require('vuex');

var _countriesList = require('countries-list');

var _countriesList2 = _interopRequireDefault(_countriesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    id: {
      required: false,
      type: String
    }
  },
  components: {
    'vb-field': _fields2.default.vbField
  },
  data: function data() {
    return {
      instance: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
  },
  created: function created() {
    var _this = this;

    if (this.id) {
      _api2.default.users.get(this.id).then(function (result) {
        _this.instance = result.data;
      }).catch(function (error) {});
    }
  },

  methods: _extends({}, (0, _vuex.mapActions)(['addMessage']), {
    save: function save() {
      var _this2 = this;

      this.$validator.validateAll().then(function (success) {
        if (_this2.instance._id) {
          _this2.update();
        } else {
          _this2.create();
        }
      }).catch(function (error) {});
    },
    create: function create() {
      var _this3 = this;

      _api2.default.users.create(this.instance).then(function (result) {
        _this3.addMessage({
          text: 'User created successfully',
          type: 'success'
        });
        _this3.$router.push({ name: 'admin.users' });
      }).catch(function (error) {});
    },
    update: function update() {
      var _this4 = this;

      _api2.default.users.update(this.instance._id, this.instance).then(function (result) {
        _this4.addMessage({
          text: 'User updated successfully',
          type: 'success'
        });
        _this4.$router.push({ name: 'admin.users' });
      }).catch(function (error) {});
    },
    cancel: function cancel() {
      this.$router.push({ name: 'admin.users' });
    }
  })

};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero"},[_c('h1',{staticClass:"title is-2"},[_vm._v(_vm._s(_vm.$t('users.create.title' )))]),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();_vm.save($event)}}},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('users.common.firstName'),"help":{show: _vm.errors.has('firstName'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.firstName),expression:"instance.firstName"},{name:"validate",rawName:"v-validate:firstName.initial",value:('required'),expression:"'required'",arg:"firstName",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('firstName')},attrs:{"type":"text","name":"firstName","placeholder":"John"},domProps:{"value":(_vm.instance.firstName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.firstName=$event.target.value}},slot:"field"})])],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('users.common.lastName'),"help":{show: _vm.errors.has('lastName'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.lastName),expression:"instance.lastName"},{name:"validate",rawName:"v-validate:lastName.initial",value:('required'),expression:"'required'",arg:"lastName",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('lastName')},attrs:{"type":"text","placeholder":"Snow","name":"lastName"},domProps:{"value":(_vm.instance.lastName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.lastName=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('users.common.email'),"help":{show: _vm.errors.has('email'), message: _vm.$t('fields.invalidEmail'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.email),expression:"instance.email"},{name:"validate",rawName:"v-validate:email.initial",value:('required|email'),expression:"'required|email'",arg:"email",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('email')},attrs:{"type":"text","placeholder":"someone@something.com","name":"email"},domProps:{"value":(_vm.instance.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.email=$event.target.value}},slot:"field"})])],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('vb-field',{attrs:{"label":_vm.$t('users.common.password'),"help":{show: _vm.errors.has('password'), message: _vm.$t('fields.requiredMessage'), level: 'is-danger'}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.instance.password),expression:"instance.password"},{name:"validate",rawName:"v-validate:password.initial",value:('required'),expression:"'required'",arg:"password",modifiers:{"initial":true}}],staticClass:"input",class:{'is-danger': _vm.errors.has('password')},attrs:{"type":"password","placeholder":"somepass","name":"lastName"},domProps:{"value":(_vm.instance.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.instance.password=$event.target.value}},slot:"field"})])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-offset-one-quarter is-clearfix is-half"},[_c('button',{staticClass:"button is-primary ",attrs:{"type":"submit","name":"submit"}},[_vm._v(_vm._s(_vm.$t('common.save')))]),_vm._v(" "),_c('button',{staticClass:"button is-warning is-pulled-right",attrs:{"type":"button","name":"cancel"},on:{"click":_vm.cancel}},[_vm._v(_vm._s(_vm.$t('common.cancel')))])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f6e06760", __vue__options__)
  } else {
    hotAPI.reload("data-v-f6e06760", __vue__options__)
  }
})()}
});

;require.register("components/users/Index.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fadeInTransition = require('../common/transitions/fade-in-transition');

var _fadeInTransition2 = _interopRequireDefault(_fadeInTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    'fade-in-transition': _fadeInTransition2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fade-in-transition',[_c('router-view')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1bc5042e", __vue__options__)
  } else {
    hotAPI.reload("data-v-1bc5042e", __vue__options__)
  }
})()}
});

;require.register("components/users/List.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _userListItem = require('./user-list-item.vue');

var _userListItem2 = _interopRequireDefault(_userListItem);

var _columnList = require('../common/lists/column-list.vue');

var _columnList2 = _interopRequireDefault(_columnList);

var _listPaginator = require('../common/lists/list-paginator.vue');

var _listPaginator2 = _interopRequireDefault(_listPaginator);

var _dataListMixin = require('../common/mixins/data-list-mixin');

var _dataListMixin2 = _interopRequireDefault(_dataListMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'usersList',
  components: {
    'column-list': _columnList2.default,
    'list-paginator': _listPaginator2.default,
    'user-list-item': _userListItem2.default
  },
  data: function data() {
    return {
      items: [],
      skip: 0,
      total: 0,
      limit: 20,
      dataSource: _api2.default.users
    };
  },

  mixins: [_dataListMixin2.default]
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-list',{attrs:{"title":"Usuarios"}},[_c('div',{slot:"filters"},[_c('list-paginator',{attrs:{"max-record":_vm.maxRecord,"total":_vm.total,"min-record":_vm.minRecord,"has-next":_vm.hasNext,"has-previous":_vm.hasPrevious},on:{"next":_vm.next,"previous":_vm.previous}}),_vm._v(" "),_c('br')],1),_vm._v(" "),_vm._l((_vm.items),function(item){return _c('div',{staticClass:"column is-6",slot:"items"},[_c('user-list-item',{attrs:{"item":item}})],1)})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1086b9f2", __vue__options__)
  } else {
    hotAPI.reload("data-v-1086b9f2", __vue__options__)
  }
})()}
});

;require.register("components/users/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Index = require('./Index.vue');

var _Index2 = _interopRequireDefault(_Index);

var _Create = require('./Create.vue');

var _Create2 = _interopRequireDefault(_Create);

var _List = require('./List.vue');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: 'users',
  component: _Index2.default,
  meta: {
    loginRequired: true
  },
  children: [{
    name: 'admin.users',
    component: _List2.default,
    path: '',
    meta: {
      loginRerequired: true
    }
  }, {
    name: 'admin.users.create',
    component: _Create2.default,
    path: 'create',
    meta: {
      loginRequired: true
    }
  }, {
    name: 'admin.users.detail',
    component: _Create2.default,
    path: ':id',
    props: true,
    meta: {
      loginRequired: true
    }
  }]
}];

});

require.register("components/users/user-list-item.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"notification"},[_c('div',{staticClass:"columns"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"column"},[_c('p',{staticClass:"title is-3"},[_c('router-link',{attrs:{"to":{ name: 'admin.users.detail', params: { id: _vm.item._id }}}},[_vm._v(_vm._s(_vm.item.firstName)+" "+_vm._s(_vm.item.lastName))])],1),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v(_vm._s(_vm.item.email))])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"column is-2"},[_c('span',{staticClass:"icon is-large"},[_c('i',{staticClass:"fa fa-user-circle"})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-495ae6d8", __vue__options__)
  } else {
    hotAPI.reload("data-v-495ae6d8", __vue__options__)
  }
})()}
});

;require.register("config/api/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this is a temporary server address, until we have a way to configure it
// properly using settings.
/**
 * Boilerplate api configuration, using axios as http request/response handler
 * and thinking in a typical authentication strategy against a rest server.
 *
 * Modify to suit your needs
 */
var env = undefined;
var host = env ? 'quierotrabajarenaltimetrik.com/api' : 'http://localhost:3030/';

var remoteApp = _axios2.default.create({
  baseURL: host,
  headers: {
    'X-Requested-With': 'FeathersJS',
    'Access-Control-Allow-Origin': '*'
  }
});

remoteApp.defaults.paramsSerializer = function (params) {
  return _qs2.default.stringify(params);
};

exports.default = remoteApp;

});

require.register("config/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  api: _api2.default,
  routes: _routes2.default,
  appTitle: 'Events Admin'
};

});

require.register("config/routes/hooks.js", function(exports, require, module) {
'use strict';

var _vuexStore = require('../../vuex-store');

var _vuexStore2 = _interopRequireDefault(_vuexStore);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  /**
   * This hook can be used to prevent non-logged in users from reaching states that require
   * authentication (i.e. everything but a fuew states)
   * @param  {Object}   to   The object representing the destination state.
   * @param  {Object}   from The object representing the origin state.
   * @param  {Function} next a function that will be called to pass on to the next state
   * @return {[type]}        [description]
   */
  loginRequired: function loginRequired(to, from, next) {
    if (to.meta.loginRequired && !_vuexStore2.default.getters.isLoggedIn) {
      console.log('login required hook');
      next({ name: 'admin.login' });
    }
    next();
  },

  changeTitle: function changeTitle(to, from, next) {
    document.title = (to.meta.title ? to.meta.title + ' - ' : '') + _index2.default.appTitle;
  }
};

});

require.register("config/routes/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('../../components/routes');

var _routes2 = _interopRequireDefault(_routes);

var _error = require('../../components/error.vue');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Import your routes from different modules here. Eg:
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * import authRoutes from auth
                                                                                                                                                                                                     */


var routes = [].concat(_toConsumableArray(_routes2.default), [{
  path: '*',
  component: _error2.default,
  name: 'error'

}]);

/**
 * Add your sub-routes here. One way to do so is:
 *
 * routes = [...routes, ...authRoutes]
 */

exports.default = routes;

});

require.register("i18n/en/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var messages = {
  common: {
    signup: 'Sign Up',
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel'
  },
  fields: {
    emailField: 'Email',
    passwordField: 'Password',
    requiredMessage: 'This field is required',
    invalidEmail: 'Not a valid email'
  },
  login: {
    login: 'Log In',
    rememberMe: 'Remember Me',
    noAccount: 'Don\'t have an account?'

  },
  validations: {
    emailNotValid: 'Not a valid email',
    required: 'This field is required'
  },
  contacts: {
    common: {
      contacts: 'Contacts',
      new: 'New Contact',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      email: 'Email',
      city: 'City',
      age: 'Age',
      country: 'Country'
    },
    list: {
      searchEmail: 'Search by Email',
      searchCity: 'Search by City'
    },
    create: {
      title: 'New Contact'
    }

  },
  events: {
    common: {
      events: 'Events',
      new: 'New Event',
      title: 'Title',
      description: 'Description',
      startDate: 'Start Date',
      endDate: 'End Date',
      createdAt: 'Created At',
      updatedAt: 'UpdatedAt'
    },
    list: {
      searchTitle: 'Search by Title'

    },
    create: {
      title: 'New Event',
      descriptionHelp: 'This is the event\'s description. Accepts Markdown'
    }

  },
  sidebar: {
    users: 'Users',
    events: 'Events',
    contacts: 'Contacts',
    registrations: 'Registrations'
  },
  users: {
    common: {
      users: 'Users',
      new: 'New User',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password'
    },
    create: {
      title: 'New User'
    }
  }
};

exports.default = messages;

});

require.register("i18n/es/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var messages = {};

exports.default = messages;

});

require.register("i18n/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _en = require('./en');

var _en2 = _interopRequireDefault(_en);

var _es = require('./es');

var _es2 = _interopRequireDefault(_es);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = {
  en: _en2.default,
  es: _es2.default
};

exports.default = messages;

});

require.register("index.js", function(exports, require, module) {
'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _countriesList = require('countries-list');

var _countriesList2 = _interopRequireDefault(_countriesList);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

require('vueify/lib/insert-css');

var _veeValidate = require('vee-validate');

var _veeValidate2 = _interopRequireDefault(_veeValidate);

var _vueI18n = require('vue-i18n');

var _vueI18n2 = _interopRequireDefault(_vueI18n);

var _routes = require('./config/routes');

var _routes2 = _interopRequireDefault(_routes);

var _hooks = require('./config/routes/hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _vuexStore = require('./vuex-store');

var _vuexStore2 = _interopRequireDefault(_vuexStore);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
// setup vee-validate
_vue2.default.use(_veeValidate2.default);
// setup vue-i18n
_vue2.default.use(_vueI18n2.default);

var router = new _vueRouter2.default({
  routes: _routes2.default,
  mode: 'history',
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },

  linkActiveClass: 'is-active'
});

// Add the loginRequired hook before each state transition
router.beforeEach(_hooks2.default.loginRequired);
router.afterEach(_hooks2.default.changeTitle);

// Translations
var i18n = new _vueI18n2.default({
  locale: 'en',
  fallbackLocale: 'en',
  messages: _i18n2.default
});

/* eslint-disable no-new */
var app = new _vue2.default({
  router: router,
  store: _vuexStore2.default,
  i18n: i18n,
  render: function render(h) {
    return h(_App2.default);
  }
});

app.$mount('#app');

window.app = app;

});

require.register("utils/notifications.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _izitoast = require('izitoast');

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationGenerator = function () {
  function NotificationGenerator() {
    _classCallCheck(this, NotificationGenerator);
  }

  _createClass(NotificationGenerator, null, [{
    key: 'generateNotification',
    value: function generateNotification(message, onClose) {
      var notification = {
        title: message.title || '',
        message: message.text,
        position: 'topCenter',
        onClose: onClose
      };
      // notify
      switch (message.type) {
        case 'success':
          _izitoast2.default.success(notification);
          break;
        case 'warning':
          _izitoast2.default.warning(notification);
          break;
        case 'error':
          _izitoast2.default.error(notification);
          break;
        default:
          _izitoast2.default.info(notification);
          break;
      }
    }
  }]);

  return NotificationGenerator;
}();

exports.default = NotificationGenerator;

});

require.register("vuex-store/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./modules/auth');

var _auth2 = _interopRequireDefault(_auth);

var _status = require('./modules/status');

var _status2 = _interopRequireDefault(_status);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

exports.default = new _vuex2.default.Store({
  modules: {
    auth: _auth2.default,
    status: _status2.default
  }
});

});

require.register("vuex-store/modules/auth.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _mutationTypes = require('../mutation-types');

var types = _interopRequireWildcard(_mutationTypes);

var _store = require('store/store');

var _store2 = _interopRequireDefault(_store);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * This is an opinionated authentication store that assumes you have an "api"
                                                                                                                                                                                                                   * module on the root of your project and it contains a sub module called "auth"
                                                                                                                                                                                                                   * that handles authentication.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Modify at will to adapt to your specific situation.
                                                                                                                                                                                                                   */


/**
 * This is our local state, initialized from the localStorage according to
 * @type {Object}
 */
var state = {
  user: _store2.default.get('user', null),
  token: _store2.default.get('token', null)
};

var getters = {
  user: function user(state) {
    return state.user;
  },
  isLoggedIn: function isLoggedIn(state) {
    return state.user != null && state.token != null;
  },
  token: function token(state) {
    return state.token;
  }
};

var actions = {
  /**
   * This action logs the user in.
   */
  login: function login(_ref, payload) {
    var commit = _ref.commit,
        state = _ref.state;

    var promise = _api2.default.auth.login(payload);
    promise.then(function (result) {
      commit(types.LOGIN, {
        user: result.data.user,
        token: result.data.accessToken
      });
      // Store the user's data (token and user representation) if marked
      if (payload.rememberMe) {
        _store2.default.set('user', result.data.user);
        _store2.default.set('token', result.data.accessToken);
      }
    });
    return promise;
  },
  logout: function logout(_ref2) {
    var commit = _ref2.commit,
        state = _ref2.state;

    _api2.default.auth.logout();
    commit(types.LOGOUT);
    _store2.default.clear();
  }
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.LOGIN, function (state, _ref3) {
  var user = _ref3.user,
      token = _ref3.token;

  state.token = token;
  state.user = user;
}), _defineProperty(_mutations, types.LOGOUT, function (state) {
  state.user = null;
  state.state = null;
}), _mutations);

exports.default = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};

});

require.register("vuex-store/modules/status.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _mutationTypes = require('../mutation-types');

var types = _interopRequireWildcard(_mutationTypes);

var _notifications = require('../../utils/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is our local state, initialized from the localStorage according to
 * @type {Object}
 */
var state = {
  messages: []
};

var getters = {
  messages: function messages(state) {
    return state.messages;
  },
  hasMesssages: function hasMesssages(state) {
    return state.messages.length == 0;
  }
};

var actions = {
  /**
   * This action logs the user in.
   */
  addMessage: function addMessage(_ref, message) {
    var commit = _ref.commit,
        state = _ref.state;

    commit(types.ADD_STATUS_MESSAGE, message);
    _notifications2.default.generateNotification(message, function (instance, toast) {
      commit(types.REMOVE_STATUS_MESSAGE, message);
    });
    return Promise.resolve(message);
  },
  removeMessage: function removeMessage(_ref2, message) {
    var commit = _ref2.commit,
        state = _ref2.state;

    commit(types.REMOVE_STATUS_MESSAGE, message);
    return Promise.resolve(message);
  }
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.ADD_STATUS_MESSAGE, function (state, message) {
  state.messages.push(message);
}), _defineProperty(_mutations, types.REMOVE_STATUS_MESSAGE, function (state, message) {
  state.messages.splice(state.messages.indexOf(message), 1);
}), _mutations);

exports.default = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};

});

require.register("vuex-store/mutation-types.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Here you will place your mutation types for each kind of mutation of each of
 * your store's modules.
 * As an example, it makes sense to add a login and logout mutation, since
 * this template uses Vuex to store the user's credentials
 */

var LOGIN = exports.LOGIN = 'LOGIN';
var LOGOUT = exports.LOGOUT = 'LOGOUT';
var ADD_STATUS_MESSAGE = exports.ADD_STATUS_MESSAGE = 'ADD_STATUS_MESSAGE';
var REMOVE_STATUS_MESSAGE = exports.REMOVE_STATUS_MESSAGE = 'REMOVE_STATUS_MESSAGE';

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map