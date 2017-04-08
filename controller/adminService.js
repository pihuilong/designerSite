'use strict';

exports.index = (req, res, next) => {
    // if (!req.session.islogin_admin) {
    //     return res.redirect('/admin_login.html');
    // }
    res.render('admin.html', { admin: req.session.islogin_admin });
}

exports.indexChange = (req, res, next) => {
    // let sql = "select * from indexAboutMe where adminID=?";
    adminModel.indexAboutMe_SEL(req.session.islogin_admin.adminID)
        .then((result) => {
            if (result.length >= 1) {
                res.render('index/change.html', { index: result[0] });
            } else {
                res.render('index/change.html');
            }
        });
}
exports.indexShow = (req, res, next) => {
    // let sql = "select * from indexAboutMe where adminID=?";
    adminModel.indexAboutMe_SEL(req.session.islogin_admin.adminID)
        .then((result) => {
            if (result.length >= 1) {
                res.render('index/show.html', { index: result[0] });
            } else {
                res.end("还没有添加数据哈，请点击左侧“主页信息->修改完善”");
            }
        });

}
exports.indexDoChange = (req, res, next) => {
    // let sql = "select * from indexAboutMe where adminID = ?";
    adminModel.indexAboutMe_SEL(req.session.islogin_admin.adminID)
        .then((result) => {
            if (result.length >= 1) {
                // sql = "update indexAboutMe set aboutme=?,experience=?,willing=? where adminID=?";
                adminModel.indexAboutMe_UPD(req.body.aboutme, req.body.myskills, req.body.mywills, req.session.islogin_admin.adminID)
                    .then((result) => {
                        res.json({ code: 1 }).end();
                    }).catch((err) => {
                        console.log(err.stack);
                        res.json({ code: 0 }).end();
                    });
            } else {
                // sql = "insert into indexAboutMe values(?,?,?,?)";
                adminModel.indexAboutMe_INS(req.session.islogin_admin.adminID, req.body.aboutme, req.body.myskills, req.body.mywills)
                    .then((result) => {
                        res.json({ code: 1 }).end();
                    }).catch((err) => {
                        console.log(err.stack);
                        res.json({ code: 0 }).end();
                    });
            }
        }).catch((err) => {
            console.log(err.stack);
            res.json({ code: 0 }).end();
        })

}


exports.resumeChange = (req, res, next) => {
    adminModel.resume_SEL_All(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render('resume/change.html', { resumes: results });
        }).catch((err) => {
            console.log(err.stack);
            res.end("rootpath/public/500.html");
        });
}
exports.resumeShow = (req, res, next) => {
    adminModel.resume_SEL_All(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render('resume/show.html', { resumes: results });
        }).catch((err) => {
            console.log(err.stack);
            res.end("rootpath/public/500.html");
        });
}
exports.resumeToChange = Promise.coroutine(function*(req, res, next) {
    let resumeID = req.params.resumeID;
    let promises = [];
    promises.push(adminModel.resume_SEL_byid(resumeID));
    promises.push(adminModel.resumeMain_SEL(resumeID));
    promises.push(adminModel.resumeSub_SEL(resumeID));
    Promise.all(promises).then((results) => {
        let resume = JSON.parse(JSON.stringify(results[0]))[0];
        let resumeMain = JSON.parse(JSON.stringify(results[1]))[0];
        let resumeSub = JSON.parse(JSON.stringify(results[2]))[0];
        resumeMain.birth = resumeMain.birth.split("T")[0];
        res.render("resume/do_change.html", { brief: resume, main: resumeMain, sub: resumeSub });
    }).catch((err) => {
        console.log(err.stack);
        res.end("服务器发生一些错误，请稍后重试！");
    });
});
exports.resumeDoChange = Promise.coroutine(function*(req, res, next) {
    let promises = [];
    promises.push(adminModel.resume_UPD(req.body.resumeName, req.body.resumeID));
    promises.push(adminModel.resumeMain_UPD(req.body.resumeID, req.body.username, req.body.gender, req.body.birth, req.body.liveSpot, req.body.highestEducation, req.body.workYears, req.body.tel, req.body.email, req.body.jobspecification, req.body.willspot, req.body.promisingIndustry, req.file.filename, req.body.jobstatus));
    promises.push(adminModel.resumeSub_UPD(req.body.resumeID, req.body.educationExperience, req.body.trainingExperience, req.body.workExperience, req.body.specializeSkill));
    Promise.all(promises).then((results) => {
        if (results[0].serverStatus == 2 && results[1].serverStatus == 2 && results[2].serverStatus == 2) {
            let oldImgPath = rootpath.concat("/public/uploads/", req.body.oldImg);
            fs.exists(oldImgPath, (exists) => {
                if (exists) {
                    fs.unlinkAsync(oldImgPath).then((err) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("成功删除文件" + oldImgPath);
                        }
                    });
                }
            });
            res.json({ code: 1 }).end();
        }
    }).catch((err) => {
        console.log('Time: ', new Date().Format("yyyy-MM-dd hh:mm:ss"));
        console.log(err.stack);
        res.json({ code: 0 }).end();
    })
});
exports.resumeAdd = (req, res, next) => {
    res.render('resume/add.html');
}
exports.resumeDoAdd = Promise.coroutine(function*(req, res, next) {
    let result = yield adminModel.resume_INS(req.session.islogin_admin.adminID, req.body.resumeName);
    if (result.serverStatus == 2) {
        result = yield adminModel.resume_SEL_one(req.session.islogin_admin.adminID, req.body.resumeName);
        let resumeID = result[0].resumeID;
        let promises = [];
        promises.push(adminModel.resumeMain_INS(resumeID, req.body.username, req.body.gender, req.body.birth, req.body.liveSpot, req.body.highestEducation, req.body.workYears, req.body.tel, req.body.email, req.body.jobspecification, req.body.willspot, req.body.promisingIndustry, req.file.filename, req.body.jobstatus));
        promises.push(adminModel.resumeSub_INS(resumeID, req.body.educationExperience, req.body.trainingExperience, req.body.workExperience, req.body.specializeSkill));
        Promise.all(promises).then((results) => {
            if (results[0].serverStatus == 2 && results[1].serverStatus == 2) {
                res.json({ code: 1 }).end();
            }
        }).catch((err) => {
            console.log('Time: ', new Date().Format("yyyy-MM-dd hh:mm:ss"));
            console.log(err.stack);
            adminModel.resume_DEL(resumeID);
            res.json({ code: 0 }).end();
        })
    }
});
exports.resumeDetail = Promise.coroutine(function*(req, res, next) {
    let resumeID = req.params.resumeID;
    let promises = [];
    promises.push(adminModel.resumeMain_SEL(resumeID));
    promises.push(adminModel.resumeSub_SEL(resumeID));
    Promise.all(promises).then((results) => {
        let resumeMain = JSON.parse(JSON.stringify(results[0]))[0];
        let resumeSub = JSON.parse(JSON.stringify(results[1]))[0];
        res.render("resume/showdetails.html", { main: resumeMain, sub: resumeSub });
    }).catch((err) => {
        console.log(err.stack);
        res.end("服务器发生一些错误，请稍后重试！");
    });
});
exports.resumeDelete = Promise.coroutine(function*(req, res, next) {
    let resumeID = req.query.resumeID;
    let imgPath = req.query.ImgPath;
    let promises = [];
    promises.push(adminModel.resumeMain_DEL(resumeID));
    promises.push(adminModel.resumeSub_DEL(resumeID));
    Promise.all(promises).then((results) => {
        if (results[0].serverStatus == 2 && results[1].serverStatus == 2) {
            adminModel.resume_DEL(resumeID).then((result) => {
                if (result.serverStatus == 2) {
                    res.json({ code: 1 }).end();
                }
            }).catch((err) => {
                console.log(err.stack);
                res.json({ code: 0 }).end();
            });
            let wholePath = rootpath.concat("/public/uploads/", imgPath);
            util.fileDelete(wholePath);
        }
    }).catch((err) => {
        console.log(err.stack);
        res.json({ code: 0 }).end();
    });
});

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