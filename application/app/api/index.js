//import registrations from './registrations'
import interceptors from './interceptors'
import config from '../config'
import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import axios from 'axios'

const restClient = rest(config.api.url)
const remoteApp = feathers()
remoteApp.configure(restClient.axios(axios))

export default remoteApp
