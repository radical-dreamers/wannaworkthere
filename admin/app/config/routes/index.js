/**
 * Import your routes from different modules here. Eg:
 *
 * import authRoutes from auth
 */
import adminRoutes from '../../components/routes'
import error from '../../components/error.vue'

let routes = [
  ...adminRoutes,
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
