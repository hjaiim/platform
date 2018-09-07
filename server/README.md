##     node  express-generator 后端

####   1.使用express-generator脚手架,构建服务端(server).(提供简单的接口)

####   2.使用mockjs,Mock.Random工具类,生成随机数据,模拟数据库数据(server-->data).

####   3.后端使用lodash工具类

####   4.使用mongodb数据库(本地)
            a.npm i mongoose -save
            b.根目录(针对server)下新建文件夹utils,这个是工具模块,新建db.js用来连接数据库.在app.js中调用改模块
            c.根目录(针对server)下新建文件夹schemas，这个是数据集模块，在模块下新建users.js文件
            d.根目录(针对server)下新建文件夹models，这个是数据模型模块，在模块下新增users.js文件
            e.后来觉得c,d 太麻烦,就把c模块过程合并到d模块中了.

####    5.使用multer接受前端上传图片
            a.formData格式
            b.base64格式
####    6.mondodb 多表联查
            a.耗费了2天时间,搞定一个简单的连表.一个血的教训就是千万不要手动往数据库写数据,一定要用代码来添加数据.一个id错误,浪费了80%时间.一直以为是代码出错.
            b.进入正题.所谓的联查,说白了,就是把一张表的数据嵌入到另一张表,这个过程.
            c.查询populate使用.
