var usersModel = require('../models/usersModel');



function test() {
  console.log('-----0000000------');

  usersModel.findOne({
    admin: 'admin'
  }, (err, dbUser) => {
    if (err) { // 用户不存在
      console.log(err);
    } else { // 有用户,核对密码
      console.log(dbUser);
    }
  })
}

test();

