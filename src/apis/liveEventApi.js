import ConfigApi from "../config/ConfigApi";
import ConfigConstant from "../config/ConfigConstant";
import AxiosClient from "./axiosClient";

class LiveEventApi {
  static async setInStreamAds(item, idContentProvider, isAllContent) {
    const url = ConfigApi.inStreamAds.inStreamAds
    const method = ConfigConstant.API_METHOD.POST
    const params = {
      group: item?.group,
      type: item?.type,
      vast_url: item?.vast_url,
      status: item?.status,
      can_skip: item?.can_skip,
      skip_after: parseInt(item?.skip_after),
      platform: item?.platform,
      is_all_platform: item?.is_all_platform,
      content_provider_id: idContentProvider,
      is_all_content: isAllContent,
      content_id: item?.content?.id
    }
    return AxiosClient.executeWithCache({url, method, params}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }
  static async getListAllInStreamAds(id) {
    const url = ConfigApi.inStreamAds.getListAllInStreamAds + '/' + id + '/instream-ads'
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({url, method}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }
    static async getListInStreamAds(id, limit, page) {
    const url = ConfigApi.inStreamAds.listInStreamAds + '/' + id + '/instream-ads' + '?limit='+ limit + '&page=' + page

    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({url, method}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }
  static async editListInStreamAds(id) {
    const url = ConfigApi.inStreamAds.inStreamAds + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    return AxiosClient.executeWithCache({url, method}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }
  static async getListInStreamAdsById(id) {
    const url = ConfigApi.inStreamAds.getListAllInStreamAds + '/' + id + '/instream-ads'
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({url, method}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }
  static async deleteLiveEventById(id) {
    const url = ConfigApi.live.liveEvent + '/' + id
    const method = ConfigConstant.API_METHOD.DELETE
    return AxiosClient.executeWithCache({url, method}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }
  static async editInStreamAdsById(id, item, idContentProvider, isAllContent) {
    const url = ConfigApi.inStreamAds.inStreamAds + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      group: item?.group,
      type: item?.type,
      vast_url: item?.vast_url,
      status: item?.status,
      can_skip: item?.can_skip,
      skip_after: parseInt(item?.skip_after),
      platform: item?.platform,
      is_all_platform: item?.is_all_platform,
      content_provider_id: idContentProvider,
      is_all_content: isAllContent,
      content_id: item?.content?.id

    }
    return AxiosClient.executeWithCache({url, method, params}).then(res => {
      const data = res?.data
      return {...res, data}
    })
  }

}
export default LiveEventApi
