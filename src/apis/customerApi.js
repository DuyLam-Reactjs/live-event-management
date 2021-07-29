
import Login from "../models/login";
import ConfigApi from "../config/ConfigApi";
import AxiosClient from "./axiosClient";
import ConfigConstant from "../config/ConfigConstant";


class CustomerApi {
  static async login (email, password) {
    const url = ConfigApi.user.login
    const method = ConfigConstant.API_METHOD.POST
    const params = {
      email: email,
      password: password,
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = new Login(res?.data?.data)
      return { ...res, data }
    })
  }
  static async changePassword (oldPassword, newPassword) {
    const url = ConfigApi.user.changePassword
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      old_password: oldPassword,
      new_password: newPassword,
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async listCustomers (offset, limit) {
    const url = ConfigApi.user.listCustomers + '?offset=' + 10 + '&limit=' + 30
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async deleteCustomer (idUser) {
    const url = ConfigApi.user.listCustomers + '/' + idUser
    const method = ConfigConstant.API_METHOD.DELETE
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async updateInfoCustomer (newEmail, newPassword) {
    const url = ConfigApi.user.listCustomers
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      email: newEmail,
      password: newPassword
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async createUser (user) {
    const url = ConfigApi.user.listCustomers
    const method = ConfigConstant.API_METHOD.POST
    const params = user
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async userProfile (id) {
    const url = ConfigApi.user.userProfile + '/' + id?.idUser
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
}

export default CustomerApi
