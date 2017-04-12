import Main from './Main.vue'
import homeRoutes from './home/routes'
import authRoutes from './auth/routes'
import usersRoutes from './users/routes'
import registrationsRoutes from './registrations/routes'

// TODO: import users, home and registrations routes


export default [
  {
    path: '/',
    component: Main,
    children: [
      ...authRoutes,
      ...usersRoutes,
      ...registrationsRoutes,
      ...homeRoutes
    ]
  }
]
