/**
 * Created by haojun on 2018/8/16.
 */

//初始化用户--模拟数据
const Users = [];
Users.push({
  id: 1,
  username: 'admin', //用户名
  name: "风车车", //姓名
  password: 'admin', //密码
  email: 'admin@qq.com', //邮箱
  nickname: '超级管理员', //昵称
  sex: 1, //性别
  addr: '北京市海淀区上地七街'
});

Users.push({
  id: 2,
  username: 'hjai',
  name: "码影", //姓名
  password: '123',
  email: 'hjaiim@163.com',
  nickname: '普通管理员',
  sex: 1, //性别
  addr: '北京市海淀区'
});

module.exports = Users;
