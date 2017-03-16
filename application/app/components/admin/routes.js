import Main from './Main.vue'
import homeRoutes from './home/routes'
import authRoutes from './auth/routes'
import usersRoutes from './users/routes'

// TODO: import users, home and registrations routes


export default [
  {
    path: '/admin',
    component: Main,
    children: [
      ...authRoutes,
      ...usersRoutes,
      ...homeRoutes
      
    ]
  }
]
