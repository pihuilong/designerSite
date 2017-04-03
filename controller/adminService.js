'use strict';

exports.index = (req, res, next) => {
    // if (!req.session.islogin_admin) {
    //     return res.redirect('/admin_login.html');
    // }
    res.render('admin.html', { admin: req.session.islogin_admin });
}

exports.indexChange = (req, res, next) => {
    let sql = "select * from indexAboutMe where adminID=?";
    util.getConn().queryAsync(sql, [req.session.islogin_admin.adminID])
        .then((result) => {
            if (result.length >= 1) {
                res.render('index/change.html', { index: result[0] });
            } else {
                res.render('index/change.html');
            }
        });
}
exports.indexShow = (req, res, next) => {
    let sql = "select * from indexAboutMe where adminID=?";
    util.getConn().queryAsync(sql, [req.session.islogin_admin.adminID])
        .then((result) => {
            if (result.length >= 1) {
                res.render('index/show.html', { index: result[0] });
            } else {
                res.end("还没有添加数据哈，请点击左侧“主页信息->修改完善”");
            }
        });

}
exports.indexDoChange = (req, res, next) => {
    let sql = "select * from indexAboutMe where adminID = ?";
    util.getConn().queryAsync(sql, [req.session.islogin_admin.adminID])
        .then((result) => {
            if (result.length >= 1) {
                sql = "update indexAboutMe set aboutme=?,experience=?,willing=? where adminID=?";
                util.getConn().queryAsync(sql, [req.body.aboutme, req.body.myskills, req.body.mywills, req.session.islogin_admin.adminID])
                    .then((result) => {
                        res.json({ code: 1 }).end();
                    }).catch((err) => {
                        console.log(err.stack);
                        res.json({ code: 0 }).end();
                    });
            } else {
                sql = "insert into indexAboutMe values(?,?,?,?)";
                util.getConn().queryAsync(sql, [req.session.islogin_admin.adminID, req.body.aboutme, req.body.myskills, req.body.mywills])
                    .then((result) => {
                        res.json({ code: 1 }).end();
                    }).catch((err) => {
                        console.log(err.stack);
                        res.json({ code: 0 }).end();
                    })
            }
        }).catch((err) => {
            console.log(err.stack);
            res.json({ code: 0 }).end();
        })

}

exports.resumeChange = (req, res, next) => {
    res.end("resumechange");
}
exports.resumeShow = (req, res, next) => {
    res.render('resume/show.html');
}

exports.myworkChange = (req, res, next) => {
    res.end("myworkchange");
}
exports.myworkShow = (req, res, next) => {
    res.end("myworkshow");
}

exports.businessChange = (req, res, next) => {
    res.end("businesschange");
}
exports.businessShow = (req, res, next) => {
    res.end("businessshow");
}

exports.orderShow = (req, res, next) => {
    res.end("ordershow");
}