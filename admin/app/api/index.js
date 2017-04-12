import auth from './auth'
import registrations from './registrations'
import users from './users'
import interceptors from './interceptors'
import api from '../config/api'

/**
 * Setup interceptors
 */
api.interceptors.request.use(interceptors.AuthInterceptor)
api.interceptors.response.use(undefined, interceptors.NotAuthorizedInterceptor)
api.interceptors.response.use(undefined, interceptors.ApiErrorInterceptor)

/**
 * This module implements all api method connections we need
 */
export default {
  auth,
  registrations,
  users
}
