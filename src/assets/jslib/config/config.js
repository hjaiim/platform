/**
 * Created by haojun on 2018/5/28.
 */

let web_config = {
  devServer: 'api/v1',                                 //后端本地或者测试
  server: 'http://127.0.0.1:3000/api/v1',          //正式
  timeout: 30000,
  successCode: 2000,  // 和后端约定的接口正常状态码
  unLoginCode: 4001   // 未登录的接口返回状态码
};

export default web_config;
