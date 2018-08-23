var express = require('express');
var router = express.Router();
var bookController = require('../../../controllers/book');

// 返回book的集合
router.get('/',bookController.find);

// 添加book
router.post('/add',bookController.add);

module.exports = router;