const mongoose = require('mongoose');

// 创建Schema
var UsersSchema = mongoose.Schema({
  name: String,
  username: String,
  nickname: String,
  password: String,
  email: String,
  sex: {
    type: Number,
    default: 1
  },
  addr: String
});

//创建model，这个地方的user对应mongodb数据库(本地)中user的conllection。
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var UsersModel = mongoose.model('user', UsersSchema);

module.exports = UsersModel;
