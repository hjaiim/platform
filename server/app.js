var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 为了解析post请求
var bodyParser = require('body-parser');
// 设置session
var session = require('express-session');

// 引入连接数据库模块
var db = require('./utils/db.js');

// 引入routes文件夹里面的文件，这些文件主要处理URL路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// 设置模板，views 设置了模板的位置；view engine设置了要使用的模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用上面引入的包
app.use(logger('dev'));

// 上传base64,字符体积大于默认值,所以扩充到50mb
app.use(bodyParser.json({
  limit: '50mb'
})); // 默认100kb
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 连接数据库
db.conn();

app.use(session({
  resave: false, // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
  saveUninitialized: false, // 初始化session时是否保存到存储。默认为true.
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }, // 设置maxAge是1天，即1天后session和相应的cookie失效过期
  secret: 'platform' // 一个String类型的字符串，作为服务器端生成session的签名
}));

app.use(express.static(path.join(__dirname, 'public')));

// 关联路由路径与引入的文件：
app.use('/', indexRouter);
app.use('/users', usersRouter);


// 最后处理错误的http请求：
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
