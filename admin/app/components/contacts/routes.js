import Index from './Index.vue'
import List from './List.vue'
import Create from './Create.vue'

export default [
  {
    path: 'contacts',
    component: Index,
    meta: {
      loginRequired: true
    },
    children: [
      {
        name: 'admin.contacts',
        path: '',
        component: List,
        meta: {
          loginRequired: true,
          title: 'Contacts'
        }
      },
      {
        name: 'admin.contacts.new',
        path: 'new',
        component: Create,
        meta: {
          loginRequired: true,
          title: 'New Contact'
        }
      },
      {
        name: 'admin.contacts.detail',
        path: ':id',
        component: Create,
        props: true,
        meta: {
          loginRequired: true,
          title: 'Contact Details'
        }
      }
    ]
  }
]
