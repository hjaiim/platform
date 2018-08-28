var express = require('express');
var router = express.Router();
var userController = require('../../../controllers/user');


// 登录
router.post('/login', userController.login);

// 登出
router.get('/logout',userController.logout);

// 先检查登录(下面的路由都需要登录才可访问)
router.use(userController.checkLogin);

// 所有已注册的用户
router.post('/find',userController.find);

module.exports = router;