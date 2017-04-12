import moment from 'moment'

import Vue from 'vue'
import Router from 'vue-router'
import 'vueify/lib/insert-css'
import VeeValidate from 'vee-validate'

import routes from './config/routes'
import routerHooks from './config/routes/hooks'
import App from './App'
import store from './vuex-store'


Vue.use(Router)
// setup vee-validate
Vue.use(VeeValidate)

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  linkActiveClass: 'is-active'
})

router.afterEach(routerHooks.changeTitle)

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')

window.app = app
