/**
 * Boilerplate api configuration, using axios as http request/response handler
 * and thinking in a typical authentication strategy against a rest server.
 *
 * Modify to suit your needs
 */
import axios from 'axios'
import qs from 'qs'


// this is a temporary server address, until we have a way to configure it
// properly using settings.
let env = $PROCESS_ENV_PRODUCTION
let host = env ? 'quierotrabajarenaltimetrik.com/api' : 'http://localhost:3030/'

let remoteApp = axios.create({
  baseURL: host,
  headers: {
    'X-Requested-With': 'FeathersJS',
    'Access-Control-Allow-Origin': '*'
  }
})

remoteApp.defaults.paramsSerializer = function (params) {
  return qs.stringify(params)
}

export default remoteApp
