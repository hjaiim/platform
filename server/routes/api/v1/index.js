var express = require('express');
var router = express.Router();
var fs = require('fs');
var lodash = require('lodash');
var path = require('path');

//轮询当前目录下的子模块，并挨个加载其路由配置
fs.readdir(__dirname, (err, files) => {
    files.forEach((file) => {
        if (!lodash.startsWith(file, '.') && file !== 'index.js') {
            try {
                router.use('/' + file.replace('.js', ''), require('./' + file));
            } catch (ex) {
                console.error('路由加载错误[' + path.join(__dirname, file) + ']：' + ex.stack);
            }
        }
    })
})

// router.use('/book',require('./book.js'));

module.exports = router;