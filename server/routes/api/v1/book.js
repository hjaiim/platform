var express = require('express');
var router = express.Router();
var bookController = require('../../../controllers/book');

//先检查登录
// router.use(userController.checkLogin);

// 返回book的集合
router.get('/', bookController.find);

// 添加book
router.post('/add', bookController.add);

module.exports = router;