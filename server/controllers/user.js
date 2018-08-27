const lodash = require('lodash');
// 假装已有2个用户
const Users = require('../data/user');

let userController = {};

// 登录
userController.login = (req, res) => {
    let username = lodash.trim(req.body.username) || '';
    let pwd = req.body.password;    // 密码可以有空格字符
    console.log(username, pwd);

    if (!username || !pwd) {
        return res.json({ "code": 40002, "msg": "不合法的参数" });
    }

    //查找已注册用户信息(后期加入数据库)
    let user = lodash.find(Users, (u) => {
        return u.username === username;
    });

    if (!user) {
        return res.json({ "code": 40003, "msg": "用户不存在" });
    }

    if (user.password === pwd) { // 密码正确
        // 设置session
        req.session.userId = user.id;

        //返回用户信息
        return res.json({
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            name: user.name,
            email: user.email
        });
    } else {
        return res.json({ "code": 40004, "msg": "密码错误" });
    }
}


module.exports = userController;