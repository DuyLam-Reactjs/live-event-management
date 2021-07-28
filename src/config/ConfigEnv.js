// const DOMAIN_API = process.env.REACT_APP_API
const DOMAIN_API =  'https://dev-api.vieon.vn' + '/'

const STATIC_DOMAIN = process.env.REACT_APP_STATIC_DOMAIN
const DEFAULT_PORT = process.env.PORT
const BUILD_ID = typeof process.env.BUILD_ID !== 'undefined' ? process.env.BUILD_ID : new Date().getTime() + ''

module.exports = {
  ENV: process.env.NODE_ENV,
  DOMAIN_API,
  BUILD_ID, 
  STATIC_DOMAIN,
  DEFAULT_PORT,
}
