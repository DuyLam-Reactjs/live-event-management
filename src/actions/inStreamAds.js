import {ACTION_TYPE} from "./actionType";
import LiveEventApi from "../apis/liveEventApi";


export const setInStreamAds = (item) =>{
  return dispatch => {
    return LiveEventApi.setInStreamAds(item).then(res => {
      const result = {
        type: ACTION_TYPE.INSTREAM_ADS,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}

export const getListInStreamAds = (id) =>{
  return dispatch => {
    return LiveEventApi.getListInStreamAds(id).then(res => {
      const result = {
        type: ACTION_TYPE.LIST_INSTREAM_ADS,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getListAllInStreamAds = (id) =>{
  return dispatch => {
    return LiveEventApi.getListAllInStreamAds(id).then(res => {
      const result = {
        type: ACTION_TYPE.LIST_ALL_INSTREAM_ADS,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getListInStreamAdsById = (id) =>{
  return dispatch => {
    return LiveEventApi.getListInStreamAdsById(id).then(res => {
      const result = {
        type: ACTION_TYPE.LIST_INSTREAM_ADS_ID,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const deleteLiveEventById = (id) =>{
  return dispatch => {
    return LiveEventApi.deleteLiveEventById(id).then(res => {
      const result = {
        type: ACTION_TYPE.DELETE_INSTREAM_ADS_ID,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
