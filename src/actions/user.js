import UserApi from "../apis/userApi";
import {ACTION_TYPE} from "./actionType";


export const getLogin = (email, password) =>{
  return dispatch => {
    return UserApi.login(email, password).then(res => {
      const result = {
        type: ACTION_TYPE.LOGIN,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getUser = (id) =>{
  return dispatch => {
    return UserApi.userProfile(id).then(res => {
      const result = {
        type: ACTION_TYPE.PROFILE,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getListUser = () =>{
  return dispatch => {
    return UserApi.listUser().then(res => {
      const result = {
        type: ACTION_TYPE.LIST_USER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}

export const deleteUser = (id) => {
  return dispatch => {
    return UserApi.deleteUser(id).then(res => {
      const result = {
        type: ACTION_TYPE.DELETE_USER,
        payload: id
      }
      dispatch(result)
      return res
    })
  }
}

export const updateInfoUser = (id, email, {read, write, is_admin}) => {
  return dispatch => {
    return UserApi.updateInfoUser(id, email, {read, write, is_admin}).then(res => {
      const result = {
        type: ACTION_TYPE.UPDATE_INFO_USER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}

export const updatePassword =  (oldPassword, newPassword) =>{
  return dispatch => {
    return UserApi.changePassword(oldPassword, newPassword).then(res => {
      const result = {
        type: ACTION_TYPE.CHANGE_PASSWORD,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}




