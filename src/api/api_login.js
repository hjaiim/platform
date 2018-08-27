/**
 * Created by haojun on 2018/6/1.
 */
import * as API from './'

export default {
  // 登录
  login: params => {
    return API.POST('user/login', params)
  },
  // 登出
  logout: params => {
    return API.POST('user/logout', params)
  }
}
