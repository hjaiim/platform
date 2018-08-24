const lodash = require('lodash');
// 假装已有2个用户
const Users = require('../data/user');

module.exports = {
    login: (req, res) => { // 登录
        let username = lodash.trim(req.body.username) || '';
        let pwd = req.body.password;    // 密码可以有空格字符
        if (!username || !pwd) {
            return res.json({ "errcode": 40002, "errmsg": "不合法的参数" });
        }

        //查找已注册用户信息(后期加入数据库)
        let user = lodash.find(Users, (u) => {
            return u.username === username;
        });

        if (!user) {
            return res.json({ "errcode": 40003, "errmsg": "用户不存在" });
        }

        if (user.password === pwd) { // 密码正确
            // 设置session
            req.session.userId = user.id;

            //返回用户信息
            req.json({
                id: user.id,
                username: user.username,
                nickname: user.nickname,
                name: user.name,
                email: user.email
            });
        } else {
            return res.json({ "errcode": 40004, "errmsg": "密码错误" });
        }
    }
}