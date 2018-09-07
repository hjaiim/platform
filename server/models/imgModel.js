/**
 * 单纯做一个和user表(collection)关联的练习,后续会结合到项目里
 */

const mongoose = require('mongoose');

// 创建imgSchema
let imgSchema = mongoose.Schema({
  path: String,
  name: String
});

let ImgModel = mongoose.model('img', imgSchema);

module.exports = ImgModel;
