import Cookie from 'react-cookies'
import * as ConfigEnv from './ConfigEnv'

const KEY = {
  ACCESS_TOKEN : 'access_token',
  ACCESS_TOKEN_TEST : 'access_token_test',
  ACCESS_TOKEN_DEV : 'access_token_dev',
  ANONYMOUS_TOKEN : 'anonymous_token',
}

const METHOD = {
  SAVE: 'SAVE',
  LOAD: 'LOAD',
  REMOVE: 'REMOVE',
}


function getTokenKey () {
  let key = KEY.ACCESS_TOKEN
  const domainAPI = ConfigEnv.DOMAIN_API
  const isTesting = (domainAPI || '').includes('testing-api')
  const isDev = (domainAPI || '').includes('dev-api')
  if (isTesting) key = KEY.ACCESS_TOKEN_TEST
  else if (isDev) key = KEY.ACCESS_TOKEN_DEV
  return key
}

function handleCookie ({type, key, value, option}) {
  //time expire token
  switch (type) {
    case METHOD.SAVE: {
      return Cookie.save(key, value, option)
    }
    case METHOD.LOAD: {
      return Cookie.load(key)
    }
    case METHOD.REMOVE: {
      Cookie.remove(key, option)
      return
    }
  }

}
function remove(key, removeOption){
  const timeNow = new Date()
  timeNow.setFullYear(timeNow.getFullYear() + 1)
  const option = { expires: timeNow, path: '/' }
  const oldOption = { expires: timeNow, domain: '.vieon.vn', path: '/' }

  if(removeOption) {
    Cookie.remove(key, removeOption)
  } else {
    Cookie.remove(key, option)
    Cookie.remove(key, oldOption)
  }

}

export default {
  KEY, METHOD,
  getTokenKey,
  handleCookie,
  remove,
}
