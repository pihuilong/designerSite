'use strict';

exports.adminLogin = (req, res, next) => {
    // let sql = "select * from admin where email = ? and adminPwd = ?";
    adminModel.admin_Login(req.body.username, req.body.password).then((result) => {
        if (result.length != 0) {
            req.session.islogin_admin = result[0];
            res.end("ok");
        } else {
            res.end("error");
        }
    });
}

exports.adminLogout = (req, res, next) => {
    delete req.session.islogin_admin;
    res.redirect("/");
}

exports.customerLogin = (req, res, next) => {
    customerModel.customer_Login(req.body.username, req.body.password).then((result) => {
        if (result.length != 0) {
            req.session.customer = result[0];
            res.end("ok");
        } else {
            res.end("error");
        }
    });
}

exports.customerLogout = (req, res, next) => {
    delete req.session.customer;
    res.end();
}