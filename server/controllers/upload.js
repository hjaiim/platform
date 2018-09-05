var muilter = require('../utils/multer');

// 设置表单上传字段的name名称。
var upload = muilter.single('file');
let uploadController = {};

uploadController.getHeadImg = function (req, res) {
  upload(req, res, function (err) {
    if (err) return console.log(err);
    // 文件信息在req.file或者req.files中显示。
    console.log(req.file);

    res.json({
      code: 2000,
      msg: '上传成功',
      imgUrl: `http://127.0.0.1:3000/images/${req.file.filename}`
    })
  });
}

module.exports = uploadController;
