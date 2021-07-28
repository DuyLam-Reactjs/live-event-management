
import ConfigApi from "../config/ConfigApi";
import AxiosClient from "./axiosClient";
import ConfigConstant from "../config/ConfigConstant";
import Content from "../models/content";
import ContentList from "../models/contentList";



class contentApi {
  static async createContentProvider (name, status, isDefault, description, data) {
    const url = ConfigApi.content.contentProvider
    const method = ConfigConstant.API_METHOD.POST
    const params = {
      name: name,
      status: status,
      is_default: isDefault,
      description: description,
      instream_ads: data
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = new Content({ ...res.data})
      return { ...res, data }
    })
  }
  static async getListContentLive ( limit, page , keyWord) {
    let url = ConfigApi.content.contentLiveList + '?limit='+ limit + '&page=' + page
    if(keyWord) url += '&keyword=' + keyWord
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data}
    })
  }
  static async getContentProviderById (id) {
    const url = ConfigApi.content.contentProvider + '/' + id
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async deleteContentProvider (id) {
    const url = ConfigApi.content.contentProvider + '/' + id
    const method = ConfigConstant.API_METHOD.DELETE
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async editContentProvider (name, status, isDefault, description, id) {
    const url = ConfigApi.content.contentProvider + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    const params ={
      id: id,
      name: name,
      status: status,
      is_default: isDefault,
      description: description,
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }

  static async searchContentProvider ( page, keyWord) {
    const url = ConfigApi.content.contentProvider  + '?page=' + page + '&keyword=' + keyWord
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async getContentList (page, limit, keyWord, category, type, contentProviderId, adsGroupsId) {
    let url = ConfigApi.content.getContentList +
      '?page=' + page +
      '&limit=' + limit
    if(keyWord) url += '&key_word=' + keyWord
    if(category) url += '&category=' + category
    if(type) url += '&content_type=' + type
    if(contentProviderId) url += '&content_provider_id=' + contentProviderId
    if(adsGroupsId) url += '&ads_group_id=' + adsGroupsId

    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      let items = (res?.data?.items || []).map(item => new ContentList(item))
      return { ...res, data: {...res?.data, items} }
    })
  }
  static async editContent (id, idContentProvider, idInStreamAds ) {
    const url = ConfigApi.content.getContentList + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      content_provider_ids: idContentProvider,
      instream_ads: idInStreamAds
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async getContentType () {
    const url = ConfigApi.content.getContentType
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async getContentCategories () {
    const url = ConfigApi.content.getContentCategories
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
}

export default contentApi
