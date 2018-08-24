module.exports = {
    checkLogin: (req, res, next) => {
        //用户已经登录
        if (req.session.userId) {
            next();
        }
        else {
            res.json({ "errcode": 40001, "errmsg": "您还没有登录" });
        }
    }
}