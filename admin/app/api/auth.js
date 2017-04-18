/**
 * Example auth api connector that lets your user log in using a defined payload
 * and returns a promise
 */

import api from '../config/api'

let endpoints = {
  login: '/authentication'
}

export default {
  login: (payload) => {
    payload.strategy = 'local'
    let res = api.post(endpoints.login, payload)
    return res
  },
  logout: () => {
    //let res = api.remove(endpoints.login)
    console.log('logout')

  }
}
