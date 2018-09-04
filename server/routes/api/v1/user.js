var express = require('express');
var router = express.Router();
var userController = require('../../../controllers/user');

var upload = require('../../../controllers/upload');
// 登录
router.post('/login', userController.login);

// 登出
router.get('/logout',userController.logout);

// 先检查登录(下面的路由都需要登录才可访问)
// router.use(userController.checkLogin);

// 查询所有已注册的用户
router.post('/search',userController.search);

// 个人信息
// router.post('/profile',userController.profile);

// 上传头像
router.post('/upload',upload.getHeadImg);

module.exports = router;