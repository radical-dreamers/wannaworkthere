let env = $PROCESS_ENV_PRODUCTION
const url = env ? 'eventmanager.stix/api' : 'http://localhost:3030'

export default {
  url
}
