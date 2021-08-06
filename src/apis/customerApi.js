
import Login from "../models/login";
import ConfigApi from "../config/ConfigApi";
import AxiosClient from "./axiosClient";
import ConfigConstant from "../config/ConfigConstant";


class CustomerApi {
  static async login (email, password) {
    const url = ConfigApi.customer.login
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
    const url = ConfigApi.customer.changePassword
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
  static async listCustomers (limit, offset) {
    const url = ConfigApi.customer.listCustomers + '?limit=' + limit + '&offset=' + offset
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data?.data
      return { ...res, data }
    })
  }
  static async deleteCustomer (idCustomer) {
    const url = ConfigApi.customer.listCustomers + '/' + idCustomer
    const method = ConfigConstant.API_METHOD.DELETE
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async updateStatusCustomer (id, status) {
    const url = ConfigApi.customer.listCustomers + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      status: status
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async updateInfoCustomer (id,newEmail, newPassword, oldPassword) {
    const url = ConfigApi.customer.listCustomers + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      email: newEmail,
      password: newPassword,
      password_old: oldPassword,
      status: 0
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async createCustomer (customer) {
    const url = ConfigApi.customer.listCustomers
    const method = ConfigConstant.API_METHOD.POST
    const params = customer
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async customerInfo (id) {
    const url = ConfigApi.customer.listCustomers + '/' + id
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
}

export default CustomerApi
