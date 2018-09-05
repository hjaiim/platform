var muilter = require('../utils/multer');

// 设置表单上传字段的name名称。
var upload = muilter.single('file');
let uploadController = {};

let fs = require('fs');
let path = require('path');
let locahost = 'http://127.0.0.1:3000';

/**
 * 以时间戳为唯一命名图片,仅限自己使用(用户量很少低).高用户量会重复
 */

uploadController.getHeadImg = function (req, res) {
  upload(req, res, function (err) {
    if (err) return console.log(err);
    // 文件信息在req.file或者req.files中显示。
    console.log(req.file);
    res.json({
      code: 2000,
      msg: '上传成功',
      imgUrl: `${locahost}/images/${req.file.filename}`
    })
  });
}

uploadController.getBase = function (req, res) {
  let imgStr = req.body.imgStr;
  // 获取图片后缀
  let imgSuffix = imgStr.match(/data:image\/(\S*);base64/)[1];
  var base64Str = imgStr.replace(/^data:image\/\w+;base64,/, '');
  var dataBuffer = new Buffer(base64Str, 'base64');

  let timeStr = Date.now();
  // 图片格式--时间戳+.+图片后缀
  fs.writeFile(path.resolve(__dirname, `../public/images/${timeStr}.${imgSuffix}`), dataBuffer, (err) => {
    if (err) return console.log(err);
    console.log('图片写入成功');
  })

  res.json({
    code: 2000,
    msg: '上传成功',
    imgUrl: `${locahost}/images/${timeStr}.${imgSuffix}`
  })
}

module.exports = uploadController;
