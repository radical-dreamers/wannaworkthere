/**
 * Import your routes from different modules here. Eg:
 *
 * import authRoutes from auth
 */
import error from '../../components/error.vue'
import hello from '../../components/Hello.vue'
import registrations from '../../components/registrations/routes'
import about from '../../components/about/routes'

let routes = [
  {
    path: '/home',
    name: 'hello',
    component: hello
  },
  ...registrations,
  ...about,
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    component: error,
    name: 'error'

  }
]

/**
 * Add your sub-routes here. One way to do so is:
 *
 * routes = [...routes, ...authRoutes]
 */

export default routes
