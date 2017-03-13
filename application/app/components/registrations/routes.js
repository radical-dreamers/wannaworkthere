import Create from './New.vue'
import Success from './Success.vue'

let routes = [
  {
    path: '/registrations-new',
    component: Create,
    name: 'registrationsNew'
  },
  {
    path: '/registrations-success',
    component: Success,
    name: 'registrationsSuccess'
  }
]

export default routes
