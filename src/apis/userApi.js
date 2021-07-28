
import Login from "../models/login";
import ConfigApi from "../config/ConfigApi";
import AxiosClient from "./axiosClient";
import ConfigConstant from "../config/ConfigConstant";


class UserApi {
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
  static async listUser (email, offset, limit) {
    const url = ConfigApi.user.listUser + '?email=' + (email || '') + '&offset=' + 10 + '&limit=' + 30
    const method = ConfigConstant.API_METHOD.GET
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async deleteUser (idUser) {
    const url = ConfigApi.user.listUser + '/' + idUser
    const method = ConfigConstant.API_METHOD.DELETE
    return AxiosClient.executeWithCache({ url, method }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async updateInfoUser (id, email, {read, write, is_admin}) {
    const url = ConfigApi.user.listUser + '/' + id
    const method = ConfigConstant.API_METHOD.PUT
    const params = {
      email: email,
      role: {
        read: read,
        write: write,
        is_admin: is_admin
      }
    }
    return AxiosClient.executeWithCache({ url, method, params }).then(res => {
      const data = res?.data
      return { ...res, data }
    })
  }
  static async createUser (user) {
    const url = ConfigApi.user.listUser
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

export default UserApi
