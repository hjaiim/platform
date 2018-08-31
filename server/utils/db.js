const mongoose = require('mongoose')
const dbName = 'admin';

const conn = () => {
  mongoose.connect(`mongodb://localhost/${dbName}}`, {
    useNewUrlParser: true
  });

  const db = mongoose.connection;
  db.on('error', function () {
    console.log(`数据库${dbName}连接失败!`)
  });

  db.once('open', function () {
    console.log(`数据库${dbName}连接成功!`)
  });

  db.once('close', function () {
    console.log(`数据库${dbName}关闭成功!`)
  });
}
module.exports = {
  conn: conn
}
