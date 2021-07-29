import CustomerApi from "../apis/customerApi";
import {ACTION_TYPE} from "./actionType";


export const getLogin = (email, password) =>{
  return dispatch => {
    return CustomerApi.login(email, password).then(res => {
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
    return CustomerApi.userProfile(id).then(res => {
      const result = {
        type: ACTION_TYPE.PROFILE,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
export const getlistCustomers = () =>{
  return dispatch => {
    return CustomerApi.listCustomers().then(res => {
      const result = {
        type: ACTION_TYPE.LIST_CUSTOMER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}

export const deleteCustomer = (id) => {
  return dispatch => {
    return CustomerApi.deleteCustomer(id).then(res => {
      const result = {
        type: ACTION_TYPE.DELETE_CUSTOMER,
        payload: id
      }
      dispatch(result)
      return res
    })
  }
}

export const updateInfoCustomer = (id, email, {read, write, is_admin}) => {
  return dispatch => {
    return CustomerApi.updateInfoCustomer(id, email, {read, write, is_admin}).then(res => {
      const result = {
        type: ACTION_TYPE.UPDATE_INFO_CUSTOMER,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}

export const updatePassword =  (oldPassword, newPassword) =>{
  return dispatch => {
    return CustomerApi.changePassword(oldPassword, newPassword).then(res => {
      const result = {
        type: ACTION_TYPE.CHANGE_PASSWORD,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}




