import Index from './Index.vue'
import List from './List.vue'
import Create from './Create.vue'

export default [
  {
    path: 'registrations',
    component: Index,
    meta: {
      loginRequired: true
    },
    children: [
      {
        name: 'admin.registrations',
        path: '',
        component: List,
        meta: {
          loginRequired: true
        }
      },
      {
        name: 'admin.registrations.create',
        path: 'create',
        component: Create,
        meta: {
          loginRequired: true
        }
      },
      {
        name: 'admin.registrations.detail',
        path: ':id',
        component: Create,
        props: true,
        meta: {
          loginRequired: true
        }
      }
    ]
  }
]
