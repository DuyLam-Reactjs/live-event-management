import { DOMAIN_API } from "./ConfigEnv"


const ConfigApi = {
  user: {
    login: DOMAIN_API + 'live-event/v1.0/customers/login',
    changePassword: DOMAIN_API + 'admin-ads/user/change-password',
    listUser: DOMAIN_API + 'live-event/v1.0/customers',
    userProfile: DOMAIN_API + 'live-event/v1.0/customers',
  },
  live: {
    liveEvent: DOMAIN_API + 'live-event/v1.0/live-entities',
  },
  content:{
    contentProvider: DOMAIN_API + 'admin-ads/content-providers',
    contentLiveList: DOMAIN_API + 'live-event/v1.0/live-entities',
    getContentList:  DOMAIN_API + 'admin-ads/contents',
    getContentType:  DOMAIN_API + 'admin-ads/list-all/content-types',
    getContentCategories:  DOMAIN_API + 'admin-ads/list-all/content-categories',
  },
  inStreamAds: {
    inStreamAds: DOMAIN_API + 'admin-ads/instream-ads',
    listInStreamAds: DOMAIN_API + 'admin-ads/content-providers',
    getListAllInStreamAds: DOMAIN_API + 'admin-ads/list-all/content-providers',

  }
}

export default  ConfigApi
