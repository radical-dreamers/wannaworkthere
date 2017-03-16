import Main from './Main.vue'
import homeRoutes from './home/routes'
import authRoutes from './auth/routes'

// TODO: import users, home and registrations routes


export default [
  {
    path: '/admin',
    component: Main,
    children: [
      ...authRoutes,
      ...homeRoutes
    ]
  }
]
