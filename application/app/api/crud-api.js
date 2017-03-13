import api from '../config/api'

/**
 * This class implements a typical CRUD REST API connector with the typical operations.
 */
class BaseRestApi {
  constructor(baseUrl) {
    this.endpoints = {
      create: baseUrl,
      update: baseUrl + ':id',
      get: baseUrl + ':id',
      find: baseUrl,
      delete: baseUrl + ':id'
    }
  }

  /**
   * Creates a new instance
   * @param  {[type]} payload [description]
   * @return {Promise}         [description]
   */
  create (instance) {
    let response = api.post(this.endpoints.create, instance)
    return response
  }
  /**
   * Updates an existing instance of with id "id"
   */
  update (id, instance) {
    let response = api.patch(this.endpoints.update.replace(':id', id), instance)
    return response
  }
  /**
   * Finds all instances matching the filters
   */
  find (filters) {
    let response = api.get(this.endpoints.find, { params: filters })
    return response
  }
  /**
   * Finds a specific instance
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  get (id) {
    let response = api.get(this.endpoints.update.replace(':id', id))
    return response
  }
  /**
   * Removes a specific instance
   */
  remove (id) {
    let response = api.delete(this.endpoints.update.replace(':id', id))
    return response
  }
}

export default BaseRestApi
