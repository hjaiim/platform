/**
 * Created by haojun on 2018/8/16.
 */

//初始化用户--模拟数据
const Users = [];
Users.push({
  id: 1,
  username: 'admin', //用户名
  name: "码影", //姓名
  password: 'admin', //密码
  email: 'hjaiim@163.com', //邮箱
  nickname: '超级管理员', //昵称
  sex: 1, //性别
  addr: '辽之国大连偏远小山沟'
});

Users.push({
  id: 2,
  username: 'huoying',
  name: "火影", //姓名
  password: '123',
  email: 'huoying@163.com',
  nickname: '普通管理员',
  sex: 1, //性别
  addr: '火之国一乐拉面馆附近'
});

Users.push({
  id: 3,
  username: 'shuiying',
  name: "水影", //姓名
  password: '123',
  email: 'shuiying@163.com',
  nickname: '普通管理员',
  sex: 0, //性别
  addr: '水之国农夫山泉附近'
});

module.exports = Users;
