import store from '../../vuex-store'
import config from '../index'

module.exports = {
   changeTitle: function (to, from, next) {
     document.title = (to.meta.title ? to.meta.title + ' - ' : '') + config.appTitle
   }
}
