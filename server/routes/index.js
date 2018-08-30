var express = require('express');
var router = express.Router();

//接口访问
router.use('/api/v1', require('./api/v1/index'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });

});

module.exports = router;
