import Index from './Index.vue'
import List from './List.vue'
import Detail from './Detail.vue'

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
        name: 'admin.registrations.detail',
        path: ':id',
        component: Detail,
        props: true,
        meta: {
          loginRequired: true
        }
      }
    ]
  }
]
