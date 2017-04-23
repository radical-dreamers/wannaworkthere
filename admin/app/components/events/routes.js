import Index from './Index.vue'
import Create from './Create.vue'
import List from './List.vue'

export default [
  {
    path: 'events',
    component: Index,
    meta: {
      loginRequired: true
    },
    children: [
      {
        name: 'admin.events',
        component: List,
        path: '',
        meta: {
          loginRerequired: true
        }
      },
      {
        name: 'admin.events.create',
        component: Create,
        path: 'create',
        meta: {
          loginRequired: true
        }
      },
      {
        name: 'admin.events.detail',
        component: Create,
        path: ':id',
        props: true,
        meta: {
          loginRequired: true
        }
      }
    ]
  }
]
