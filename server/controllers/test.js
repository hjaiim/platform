var UsersModel = require('../models/usersModel');
const mongoose = require('mongoose');

let imgModel = require('../models/imgModel');
mongoose.connect(`mongodb://localhost/admin`, {
  useNewUrlParser: true
});

//  数据库,用户表中唯一id
UsersModel.findOne({
  _id: '5b87f23bac78a3361b181f61'
}).populate('imgPath').exec((err, data) => {
  if (err) return console.log(err);
  console.log(data);
})
