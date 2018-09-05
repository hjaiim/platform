const lodash = require('lodash');
// 假装已有2个用户
// const Users = require('../data/user');
let Users = [];

var UsersModel = require('../models/usersModel');

let userController = {};

// 查看是否登录
userController.checkLogin = (req, res, next) => {
  //用户已经登录
  if (req.session.userId) {
    next();
  } else {
    res.json({
      code: 4001,
      msg: "您还没有登录"
    });
  }
}

// 登录
userController.login = (req, res) => {
  let username = lodash.trim(req.body.username) || '';
  let pwd = req.body.password; // 密码可以有空格字符

  if (!username || !pwd) {
    return res.json({
      "code": 40002,
      "msg": "不合法的参数"
    });
  }

  UsersModel.findOne({
    username: username
  }, (err, dbUser) => {
    if (err) { // 用户不存在
      return res.json({
        code: '40003',
        msg: "用户不存在"
      })
    } else { // 有用户,核对密码
      if (dbUser.password === pwd) {
        // 设置session
        req.session.userId = dbUser.id;
        // 返回用户信息
        return res.json({
          id: dbUser.id,
          username: dbUser.username,
          nickname: dbUser.nickname,
          name: dbUser.name,
          email: dbUser.email
        });
      } else {
        return res.json({
          "code": 40004,
          "msg": "密码错误"
        });
      }
    }
  })

  // 查找已注册用户信息(后期加入数据库)
  // let user = lodash.find(Users, (u) => {
  //   return u.username === username;
  // });

  // if (!user) {
  //   return res.json({
  //     "code": 40003,
  //     "msg": "用户不存在"
  //   });
  // }

  // if (user.password === pwd) { // 密码正确
  //   // 设置session
  //   req.session.userId = user.id;

  //   // 返回用户信息
  //   return res.json({
  //     id: user.id,
  //     username: user.username,
  //     nickname: user.nickname,
  //     name: user.name,
  //     email: user.email
  //   });
  // } else {
  //   return res.json({
  //     "code": 40004,
  //     "msg": "密码错误"
  //   });
  // }
}

// 登出
userController.logout = (req, res) => {
  req.session.destroy();
  res.json({
    code: 2000,
    msg: '登出成功'
  })
}

// 查找账户
userController.search = (req, res) => {
  let page = parseInt(req.body.page) || 1;
  let pageSize = parseInt(req.body.pageSize) || 10;
  let name = req.body.name || '';
  console.log(name);

  let total = 0;

  let resData = [];

  if (name) { // 精准查询
    let findArr = Users.filter(user => {
      return (user.name.indexOf(name) > -1);
    })
    total = findArr.length;
    resData = findArr.filter((user, index) => index < page * pageSize && index >= pageSize * (page - 1));
  } else { // 模糊查询
    total = Users.length;
    resData = Users.filter((user, index) => index < page * pageSize && index >= pageSize * (page - 1));
  }

  res.json({
    total: total,
    users: resData
  })
}


module.exports = userController;
