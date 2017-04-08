'use strict';

exports.login = (req, res, next) => {
    // let sql = "select * from admin where email = ? and adminPwd = ?";
    adminModel.admin_Login(req.body.username, req.body.password).then((result) => {
        if (result.length != 0) {
            req.session.islogin_admin = result[0];
            res.end("ok");
        } else {
            res.end("error");
        }
    });
    // if (req.body.username == "admin@qq.com" && req.body.password == "admin") {
    //     req.session.islogin_admin = true;
    //     res.end("ok");
    // } else {
    //     res.end("error");
    // }
}