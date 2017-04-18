import Main from './Main.vue'
import homeRoutes from './home/routes'
import authRoutes from './auth/routes'
import usersRoutes from './users/routes'
import registrationsRoutes from './registrations/routes'
import contactsRoutes from './contacts/routes'


export default [
  {
    path: '/',
    component: Main,
    children: [
      ...authRoutes,
      ...usersRoutes,
      ...registrationsRoutes,
      ...contactsRoutes,
      ...homeRoutes
    ]
  }
]
