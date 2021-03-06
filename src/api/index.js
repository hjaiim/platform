/**
 * Created by haojun on 2018/8/7.
 */
import axios from 'axios';
import qs from 'qs';
import * as utils from 'hjai-utils/dist/utils.min.js';
import router from '../router';
import web_config from 'libs/config/config';

// axios默认提交使用这种格式application/json
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? web_config.devServer : web_config.server;
axios.defaults.timeout = web_config.timeout;
axios.defaults.withCredentials = true;

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // 设置全局参数
  setGlobalParames(config);
  // 参数设置Form Data 格式
  if (config.method === 'post' && config.needFormData) {
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === web_config.unLoginCode) { // 未登录

      // 清除登录状态(登出)
      utils.data.delData('isLogin');

      router.push({
        path: '/login',
        query: getQuery(router.history.current.fullPath)
      })
    }

    // 参数格式不对,接口正常,code异常(正常情况下.后台接口调通,会返回一个code状态码).
    if (parseInt(response.data.code) !== web_config.successCode) {
      return Promise.reject(response.data)
    }
  }
  return response;
}, error => {
  // Do something with response error
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break

      case 401:
        error.message = '未授权，请登录'
        break

      case 403:
        error.message = '拒绝访问'
        break

      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break

      case 408:
        error.message = '请求超时'
        break

      case 500:
        error.message = '服务器内部错误'
        break

      case 501:
        error.message = '服务未实现'
        break

      case 502:
        error.message = '网关错误'
        break

      case 503:
        error.message = '服务不可用'
        break

      case 504:
        error.message = '网关超时'
        break

      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
        error.message = `连接出错(${error.response.status})!`;
    }
  } else {
    error.message = '网络异常,连接服务器失败!'
  }
  return Promise.reject(error);
});

export const POST = (url, params, config = {}) => {
  return axios.post(url, params, config).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(url, {
    params: params
  }).then(res => res.data)
}

export const ALL = (promiseArr) => {
  return axios.all(promiseArr)
}

/**
 * 1.去掉路由带的'/'
 * 2.如果是默认页面,则不需要'redirect'
 * @param path
 */
function getQuery(path) {
  let queryObj = {};
  if (path != '/') {
    queryObj['redirect'] = path.replace('/', '');
  }
  return queryObj;
}

/**
 * 设置全局请求参数
 * @param {axios config} $config 
 */
function setGlobalParames($config) {
  if (JSON.stringify(web_config.globalParameObj) == '{}') {
    return;
  };

  if ($config.method === 'get') {
    merge($config.params, web_config.globalParameObj);
  }

  if ($config.method === 'post') {
    merge($config.data, web_config.globalParameObj);
  }
}

/**
 * 合并对象(浅复制)
 * @param {目标对象} target
 * @param {源对象} source
 */
function merge(target = {}, source) {
  Object.assign(target, source);
}
