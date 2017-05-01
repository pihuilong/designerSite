'use strict';

//管理员注册
exports.admin = Promise.coroutine(function*(req, res, next) {
    //先判断用户名和邮箱是否存在
    let admin = yield adminModel.admin_exist(req.body.adminName);
    let email = yield adminModel.email_exist(req.body.email);
    if (admin.length >= 1) {
        res.json({ code: 2 }).end();
        return false;
    } else if (email.length >= 1) {
        res.json({ code: 3 }).end();
        return false;
    } else {
        //将用户插入数据库
        adminModel.admin_INS(req.body.adminName, req.body.password, req.body.email, req.file.filename)
            .then((result) => {
                if (result.serverStatus == 2) {
                    //插入成功后，找到其ID，然后将默认值插入indexSkill表中
                    adminModel.admin_exist(req.body.adminName).then((admin) => {
                        let adminID = admin[0].adminID;
                        let promises = [];
                        promises.push(adminModel.indexSkill_INS(adminID, req.body.skill1));
                        promises.push(adminModel.indexSkill_INS(adminID, req.body.skill2));
                        promises.push(adminModel.indexSkill_INS(adminID, req.body.skill3));
                        promises.push(adminModel.indexSkill_INS(adminID, req.body.skill4));
                        Promise.all(promises).then((results) => {
                            res.json({ code: 1 }).end();
                        }).catch((err) => {
                            util.errorHandle(err);
                        });
                    });
                }
            }).catch((err) => {
                util.errorHandle(err);
                res.json({ code: 0 }).end();
            });
    }
});


//客户注册
exports.customer = Promise.coroutine(function*(req, res, next) {
    //先判断邮箱是否存在
    let email = yield customerModel.email_exist(req.body.email);
    if (email.length >= 1) {
        res.json({ code: 3 }).end();
        return false;
    } else {
        if (typeof(req.file) == "undefined") {
            req.file = { filename: "default.png" };
        }
        //将用户插入数据库
        customerModel.customer_INS(req.body.userName, req.body.password, req.body.email, req.file.filename)
            .then((result) => {
                if (result.serverStatus == 2) {
                    res.json({ code: 1 }).end();
                }
            }).catch((err) => {
                util.errorHandle(err);
                res.json({ code: 0 }).end();
            });
    }
});