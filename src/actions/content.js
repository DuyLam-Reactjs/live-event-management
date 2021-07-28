
import {ACTION_TYPE} from "./actionType";
import contentApi from "../apis/contentApi";


export const createContentProvider = (id, name, status, isDefault, description) =>{
  return dispatch => {
    return contentApi.createContentProvider(id, name, status, isDefault, description).then(res => {
      const result = {
        type: ACTION_TYPE.CREATE_CONTENT_PROVIDER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getListContentLive =  ( limit, page) =>{
  return dispatch => {
    return contentApi.getListContentLive( limit, page).then(res => {
      const result = {
        type: ACTION_TYPE.LIST_CONTENT_PROVIDER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getContentProviderById = (id) =>{
  return dispatch => {
    return contentApi.getContentProviderById(id).then(res => {
      const result = {
        type: ACTION_TYPE.CONTENT_PROVIDER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const deleteContentProvider= (id) =>{
  return dispatch => {
    return contentApi.deleteContentProvider(id).then(res => {
      const result = {
        type: ACTION_TYPE.DELETE_CONTENT_PROVIDER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}

export const editContentProvider= (id, name, status, is_default,description) =>{
  return dispatch => {
    return contentApi.editContentProvider(id, name, status, is_default,description).then(res => {
      const result = {
        type: ACTION_TYPE.EDIT_CONTENT_PROVIDER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getContentList= (page, keyWord, category, type, offset, limit, contentProviderId, adsGroupsId) =>{
  return dispatch => {
    return contentApi.getContentList(page, keyWord, category, type, offset, limit, contentProviderId, adsGroupsId).then(res => {
      const result = {
        type: ACTION_TYPE.LIST_CONTENT,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const editContent= () =>{
  return dispatch => {
    return contentApi.editContent().then(res => {
      const result = {
        type: ACTION_TYPE.EDIT_CONTENT,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}




