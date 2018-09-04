var muilter = require('../utils/multer');

// 设置表单上传字段的name名称。
var upload = muilter.single('file');
let uploadController = {};

uploadController.getHeadImg = function (req, res) {
  upload(req, res, function (err) {
    if (err) return console.log(err);
    // 文件信息在req.file或者req.files中显示。
    console.log(req.file);
  });
}

module.exports = uploadController;
