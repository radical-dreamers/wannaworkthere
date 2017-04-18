import Index from './Index.vue'
import Create from './Create.vue'
import List from './List.vue'

export default [
  {
    path: 'users',
    component: Index,
    meta: {
      loginRequired: true
    },
    children: [
      {
        name: 'admin.users',
        component: List,
        path: '',
        meta: {
          loginRerequired: true
        }
      },
      {
        name: 'admin.users.create',
        component: Create,
        path: 'create',
        meta: {
          loginRequired: true
        }
      },
      {
        name: 'admin.users.detail',
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
