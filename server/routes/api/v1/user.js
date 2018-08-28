var express = require('express');
var router = express.Router();
var userController = require('../../../controllers/user');

// 登录
router.post('/login', userController.login);

// 登出
router.get('/logout',userController.logout);

module.exports = router;