import LocalStorage from "../config/LocalStorage";
import ConfigCookie from "../config/ConfigCookie";
import {toast} from "react-toastify";




const setUrlParams = (url, params) => {
  let newUrl = new URL(url);
  (params && Object.keys(params)) && Object.keys(params).forEach(key => {
    if (params[key]) {
      newUrl.searchParams.set(key, params[key])
    }
  })
  return newUrl
}
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const json_to_query_string = (json) => {
  return Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
    .join('&')
}

const handleLocalStorage  = (action, key, value) => {

  if (typeof window === 'undefined' || !window.localStorage) return ''
  try {
    if (action === LocalStorage.GET) {
      return (window.localStorage.getItem(key))
    } else if (action === LocalStorage.SET) {
      return window.localStorage.setItem(key, value)
    } else if (action === LocalStorage.REMOVE) {
      return window.localStorage.removeItem(key)
    }
    if (action === LocalStorage.CLEAR) {
      return window.localStorage.clear()
    }
  } catch (e) {
    return { error: e }
  }
}

function parsedTimeCreate  (time) {
  let utcDate = new Date(time);
  let offset = new Date().getTimezoneOffset() * 60000;
  let localDate = new Date(utcDate.getTime() + offset);
  return localDate.toLocaleString("en-GB")
}
function parsedIdContentProvider (item) {
  let arrId = []
  item?.forEach((it)=>{
    arrId.push(it?.id)
  })
  return arrId
}
function sendToast ({ message }) {

  return (toast.info(message))
}
function parsedNumberUrl (vastUrl) {
  const {url_1, url_2, url_3} = vastUrl || {}

  let numberVastUrl = ''
  if (url_1) numberVastUrl = 1
  if (url_2) numberVastUrl += 1
  if (url_3) numberVastUrl += 1

  return numberVastUrl
}
function parsedIdAdsGroups (contentProviderItem) {
  let newArrAds = []
  contentProviderItem?.forEach((provider)=>{
    provider?.adsGroups?.forEach((agr)=>{
      const el = {}
      el.id = agr?.id
      el.status = agr?.status
      newArrAds.push(el)
    })
  })
  return newArrAds
}


// function parsedTypeContentList (type) {
//   switch (type) {
//     case 1 : return 'Single Movie'
//     case 2 : return 'Show/Drama'
//     case 3 : return 'Season'
//     case 4 : return 'Episode'
//     case 5 : return 'LiveTv'
//     case 6 : return 'Trailer'
//     case 7 : return 'Epg'
//     case 8 : return 'Live Stream'
//     case 9 : return 'Single Movie'
//   }
//   return type
// }


// function parsedStatusContentList (status) {
//   switch (status) {
//     case -1 : return 'Delete'
//     case 1 : return 'Chờ xử lý'
//     case 2 : return 'Chờ QC'
//     case 3 : return 'Xuất bản'
//     case 4 : return 'Tạm ngưng x.bản'
//     case 5 : return 'Tái xuất bản'
//     case 6 : return 'Đóng'
//     case 7 : return 'Schedule Publish'
//     case 8 : return 'Chờ soạn thảo'
//     case 9 : return 'Review'
//
//   }
//   return status
// }

export function parsedPageLimit  (total, rowPerPage) {
  let max = Math.floor(total / rowPerPage)
  if (total % rowPerPage !== 0) {
    max++;
  }
  if (max === 0) {
    max = 1;
  }
  return max
}

function parseContentList (items) {
  if (!items || items.length === 0) return []
  return items
}

function saveApiKey (apiKey) {
  //time expire token
  const timeNow = new Date()
  timeNow.setFullYear(timeNow.getFullYear() + 1)
  //save access token
  const option = {
    expires: timeNow,
    // domain: 'http://localhost:3000',
    path: '/'
  }

  try {
    const key = ConfigCookie.getTokenKey()
    const type = ConfigCookie.METHOD.SAVE
    const value = apiKey
    ConfigCookie.handleCookie({ type, key, value, option })
    ConfigCookie.handleCookie({
      type: ConfigCookie.METHOD.REMOVE,
      key: ConfigCookie.KEY.ANONYMOUS_TOKEN,
      option
    })
    handleLocalStorage(LocalStorage.SET, LocalStorage.RE_LOGIN, true)
    handleLocalStorage(LocalStorage.SET, 'ApiKey', apiKey)
  } catch (e) {
    throw e
  }
}
async function removeApiKey (router, notRefresh) {
  try {
    await ConfigCookie.remove(ConfigCookie.KEY.API_KEY)
    await ConfigCookie.remove(ConfigCookie.KEY.API_KEY_TEST)
    await ConfigCookie.remove(ConfigCookie.KEY.API_KEY_DEV)
    await ConfigCookie.remove(ConfigCookie.KEY.ANONYMOUS_TOKEN)
  } catch (e) {
    throw e
  }

  if (typeof window === 'undefined') return

  if (!notRefresh) {
    window.location.reload()
  }
}

const classUseStyles = (theme) => ({
  root: {
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      transform: "transparent"
    },
    "& .MuiFormLabel-root": {
      color: '#222222',
      fontSize: "12.5px"
    }
    ,"& .MuiSvgIcon--root": {
      color: '#636f83',
    }
    ,"& .MuiInputLabel-root": {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '50%',
      overflow: 'hidden',
    }
  },
  inputRoot: {
    color: "#222222",
    fontSize: "12.5px",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      paddingLeft: 5.25
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    }
  }
})



export {
  sendToast,
  setUrlParams,
  validateEmail,
  saveApiKey,
  handleLocalStorage,
  json_to_query_string,
  parsedTimeCreate,
  parseContentList,
  parsedIdContentProvider,
  parsedIdAdsGroups,
  parsedNumberUrl,
  classUseStyles,
  removeApiKey
}

