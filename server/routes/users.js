
// 首先加载express，通过express获取到router对象
var express = require('express');
var router = express.Router();

/* GET users listing. */

/* 使用router对象指定路由的方法和路径,
   由于在app.js已经指定 /users 到本文件，
   因此当浏览器请求/user时，会执行下面的回调函数
*/

// 回调函数有第三个参数next，主要用于中间件中，
// 即将数据传递到下一个方法去处理
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
