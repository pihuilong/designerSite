'use strict';


exports.index = (req, res, next) => {
    let promises = [];
    promises.push(adminModel.indexSkill_SEL(req.session.islogin_admin.adminID));
    promises.push(adminModel.admin_SEL(req.session.islogin_admin.adminID));
    Promise.all(promises).then((results) => {
        let skills = JSON.parse(JSON.stringify(results[0]));
        let admin = JSON.parse(JSON.stringify(results[1]))[0];
        res.render('admin/admin.html', { admin: admin, skills: skills });
    });
    // adminModel.indexSkill_SEL(req.session.islogin_admin.adminID)
    //     .then((skills) => {
    //         res.render('admin/admin.html', { admin: req.session.islogin_admin, skills: skills });
    //     });
}

exports.indexChange = (req, res, next) => {
    // let sql = "select * from indexAboutMe where adminID=?";
    adminModel.indexAboutMe_SEL(req.session.islogin_admin.adminID)
        .then((result) => {
            if (result.length >= 1) {
                res.render('admin/index/change.html', { index: result[0] });
            } else {
                res.render('admin/index/change.html', { index: {} });
            }
        });
}
exports.indexShow = (req, res, next) => {
    // let sql = "select * from indexAboutMe where adminID=?";
    adminModel.indexAboutMe_SEL(req.session.islogin_admin.adminID)
        .then((result) => {
            if (result.length >= 1) {
                res.render('admin/index/show.html', { index: result[0] });
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
            res.render('admin/resume/change.html', { resumes: results });
        }).catch((err) => {
            console.log(err.stack);
            res.redirect("/500.html");
        });
}
exports.resumeShow = (req, res, next) => {
    adminModel.resume_SEL_All(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render('admin/resume/show.html', { resumes: results });
        }).catch((err) => {
            console.log(err.stack);
            res.redirect('/500.html');
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
        res.render("admin/resume/do_change.html", { brief: resume, main: resumeMain, sub: resumeSub });
    }).catch((err) => {
        console.log(err.stack);
        res.redirect('/500.html');
    });
});
exports.resumeDoChange = Promise.coroutine(function*(req, res, next) {
    if (req.body.display == '1') {
        let adminID = req.session.islogin_admin.adminID;
        let makeNotShow = yield adminModel.resume_NotShow(adminID);
        if (makeNotShow.serverStatus != 2) {
            res.json({ code: 0 }).end();
        }
    }
    let promises = [];
    promises.push(adminModel.resume_UPD(req.body.resumeName, req.body.resumeID, req.body.display));
    promises.push(adminModel.resumeMain_UPD(req.body.resumeID, req.body.username, req.body.gender, req.body.birth, req.body.liveSpot, req.body.highestEducation, req.body.workYears, req.body.tel, req.body.email, req.body.jobspecification, req.body.willspot, req.body.promisingIndustry, req.file.filename, req.body.jobstatus));
    promises.push(adminModel.resumeSub_UPD(req.body.resumeID, req.body.educationExperience, req.body.trainingExperience, req.body.workExperience, req.body.specializeSkill));
    Promise.all(promises).then((results) => {
        if (results[0].serverStatus == 2 && results[1].serverStatus == 2 && results[2].serverStatus == 2) {
            let oldImgPath = rootpath.concat("/public/uploads/admin/", req.body.oldImg);
            util.fileDelete(oldImgPath);
            res.json({ code: 1 }).end();
        }
    }).catch((err) => {
        console.log('Time: ', new Date().Format("yyyy-MM-dd hh:mm:ss"));
        console.log(err.stack);
        res.json({ code: 0 }).end();
    })
});
exports.resumeAdd = (req, res, next) => {
    res.render('admin/resume/add.html');
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
        res.render("admin/resume/showdetails.html", { main: resumeMain, sub: resumeSub });
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
            let wholePath = rootpath.concat("/public/uploads/admin/", imgPath);
            util.fileDelete(wholePath);
        }
    }).catch((err) => {
        console.log(err.stack);
        res.json({ code: 0 }).end();
    });
});

exports.editBase = (req, res, next) => {
    adminModel.admin_SEL(req.session.islogin_admin.adminID)
        .then((result) => {
            res.render("admin/base_change.html", { admin: result[0] });
        }).catch((err) => { util.errorHandle(err) });
}
exports.doEditBase = (req, res, next) => {
    adminModel.admin_UDP_portrait(req.session.islogin_admin.adminID, req.file.filename).catch(err => { util.errorHandle(err) });
    let wholePath = rootpath.concat("/public/uploads/admin/", req.body.oldPortrait);
    util.fileDelete(wholePath);
    let skills = [req.body.skill1, req.body.skill2, req.body.skill3, req.body.skill4];
    adminModel.indexSkill_SEL(req.session.islogin_admin.adminID).then(function(results) {
        let promises = [];
        for (let i = 0; i < results.length; i++) {
            promises.push(adminModel.indexSkill_UPD(results[i].skillID, skills[i]));
        }
        Promise.all(promises).then((results) => {
            for (let i = 0; i < results.length; i++) {
                if (results[i].serverStatus != 2) {
                    res.json({ code: 0 }).end();
                    return false;
                }
            }
            res.json({ code: 1 }).end();
        }).catch(err => { util.errorHandle(err) });
    }).catch(err => { util.errorHandle(err) });
}

exports.myworkChange = (req, res, next) => {
    adminModel.worksType_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render("admin/mywork/work_delete_change", { types: results });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.workItemModify = (req, res, next) => { //点击分类获取到该分类下的作品（修改及删除用）
    adminModel.works_SEL(req.query.typeID).then((results) => {
        res.render('admin/mywork/modifyItems.html', { works: results });
    }).catch((err) => {
        util.errorHandle(err);
    });
}
exports.workItemShow = (req, res, next) => { //点击分类获取到该分类下的作品(查看用)
    adminModel.works_SEL(req.query.typeID).then((results) => {
        res.render('admin/mywork/showItems.html', { works: results });
    }).catch((err) => {
        util.errorHandle(err);
    });
}
exports.myworkShow = (req, res, next) => {
    adminModel.worksType_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render("admin/mywork/work_show.html", { types: results });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.myworkType = (req, res, next) => {
    adminModel.worksType_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render("admin/mywork/work_type.html", { types: results });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.workTypeAdd = (req, res, next) => {
    adminModel.worksType_INS(req.session.islogin_admin.adminID, req.body.typeName, req.body.typeDesc)
        .then((result) => {
            res.json({ code: 1 }).end();
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        });
}
exports.workTypeDel = (req, res, next) => {
    adminModel.worksType_DEL(req.body.typeID).then((result) => {
        res.json({ code: 1 }).end();
    }).catch((err) => {
        res.json({ code: 0 }).end();
        util.errorHandle(err);
    });
}
exports.workTypeChg = (req, res, next) => {
    adminModel.worksType_UPD(req.body.typeID, req.body.typeName, req.body.typeDesc)
        .then((result) => {
            res.json({ code: 1 }).end();
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        });
}
exports.myworkUpload = (req, res, next) => {
    adminModel.worksType_SEL(req.session.islogin_admin.adminID).then((rets) => {
        res.render("admin/mywork/work_add.html", { types: rets });
    }).catch((err) => {
        util.errorHandle(err);
        res.end("请稍后尝试！");
    });
}
exports.myworkDoUpload = (req, res, next) => {
    let promises = [];
    req.files.map((file) => {
        promises.push(adminModel.works_INS(req.body.typeID, req.body.workName, req.body.workDesc, file.filename, req.body.workLink, req.body.showIndex));
    });
    Promise.all(promises).then((results) => {
        for (let i = 0; i < results.length; i++) {
            if (results[i].serverStatus != 2) {
                res.json({ code: 0 }).end();
                return false;
            }
        }
        res.json({ code: 1 }).end();
    }).catch((err) => { util.errorHandle(err) });
}
exports.workDelete = (req, res, next) => {
    adminModel.work_DEL(req.body.worksID).then((result) => {
        if (result.serverStatus == "2") {
            res.json({ code: 1 }).end();
            let wholePath = rootpath.concat("/public/uploads/works/", req.body.workImg);
            util.fileDelete(wholePath);
        } else {
            res.json({ code: 0 }).end();
        }
    }).catch((err) => {
        res.json({ code: 0 }).end();
        util.errorHandle(err);
    });

}
exports.workChg = (req, res, next) => {
    adminModel.works_UPD(req.body.worksID, req.body.workName, req.body.workDesc, req.body.workLink, req.body.showIndex)
        .then((result) => {
            if (result.serverStatus == "2") {
                res.json({ code: 1 }).end();
            } else {
                res.json({ code: 0 }).end();
            }
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        });
}

exports.serviceItemShow = (req, res, next) => {
    adminModel.service_SEL(req.query.typeID).then((results) => {
        res.render('admin/business/showItems.html', { services: results });
    }).catch((err) => {
        util.errorHandle(err);
    });
}
exports.businessChg = (req, res, next) => {
    adminModel.service_UPD(req.body.serviceID, req.body.serviceTitle, req.body.serviceDescription, req.body.servicePrice)
        .then((result) => {
            if (result.serverStatus == "2") {
                res.json({ code: 1 }).end();
            } else {
                res.json({ code: 0 }).end();
            }
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        });
}
exports.businessDelete = (req, res, next) => {
    adminModel.service_DEL(req.body.serviceID).then((result) => {
        if (result.serverStatus == "2") {
            res.json({ code: 1 }).end();
            if (req.body.serviceLogo !== "default_service.png") {
                let wholePath = rootpath.concat("/public/uploads/service/", req.body.serviceLogo);
                util.fileDelete(wholePath);
            }
        } else {
            res.json({ code: 0 }).end();
        }
    }).catch((err) => {
        res.json({ code: 0 }).end();
        util.errorHandle(err);
    });
}
exports.serviceItemModify = (req, res, next) => {
    adminModel.service_SEL(req.query.typeID).then((results) => {
        res.render('admin/business/modifyItems.html', { services: results });
    }).catch((err) => {
        util.errorHandle(err);
    });
}
exports.businessAdd = (req, res, next) => {
    adminModel.serviceType_SEL(req.session.islogin_admin.adminID).then((rets) => {
        res.render("admin/business/business_add.html", { types: rets });
    }).catch((err) => {
        util.errorHandle(err);
        res.end("请稍后尝试！");
    });
}
exports.businessDoAdd = (req, res, next) => {
    if (typeof(req.file) == "undefined") {
        req.file = { filename: "default_service.png" };
    }
    adminModel.service_INS(req.body.typeID, req.body.serviceName, req.body.serviceDesc, req.body.servicePrice, req.file.filename)
        .then((result) => {
            if (result.serverStatus == "2") {
                res.json({ code: 1 }).end();
            } else {
                res.json({ code: 0 }).end();
            }
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.businessType = (req, res, next) => {
    adminModel.serviceType_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render("admin/business/business_type.html", { types: results });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.businessTypeAdd = (req, res, next) => {
    if (typeof(req.file) == "undefined") {
        req.file = { filename: "default.png" };
    }
    adminModel.serviceType_INS(req.session.islogin_admin.adminID, req.body.typeName, req.body.typeDesc, req.file.filename)
        .then((result) => {
            res.json({ code: 1 }).end();
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        });
}
exports.businessTypeDel = (req, res, next) => {
    adminModel.serviceType_DEL(req.body.typeID).then((result) => {
        if (req.body.oldImg != "default.png") {
            let wholePath = rootpath.concat("/public/uploads/service/", req.body.oldImg);
            util.fileDelete(wholePath);
        }
        res.json({ code: 1 }).end();
    }).catch((err) => {
        res.json({ code: 0 }).end();
        util.errorHandle(err);
    });
}
exports.businessTypeChg = (req, res, next) => {
    if (typeof(req.file) == "undefined") {
        req.file = { filename: "default.png" };
    }
    adminModel.serviceType_UPD(req.body.typeID, req.body.typeName, req.body.typeDesc, req.file.filename)
        .then((result) => {
            if (req.body.oldImg != "default.png") {
                let wholePath = rootpath.concat("/public/uploads/service/", req.body.oldImg);
                util.fileDelete(wholePath);
            }
            res.json({ code: 1 }).end();
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        });
}
exports.businessChange = (req, res, next) => {
    adminModel.serviceType_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render("admin/business/business_delete_change", { types: results });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.businessShow = (req, res, next) => {
    adminModel.serviceType_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            res.render("admin/business/business_show.html", { types: results });
        }).catch((err) => {
            util.errorHandle(err);
        });
}

exports.orderShow = (req, res, next) => {
    let typeID = req.params.typeID;
    if (typeID == 0) {
        customerModel.orders_SEL = customerModel.orders_SEL_Working;
    } else if (typeID == 1) {
        customerModel.orders_SEL = customerModel.orders_SEL_Finish;
    } else {
        customerModel.orders_SEL = customerModel.orders_SEL_Cancel;
    }
    customerModel.orders_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            let promises = [];
            for (let i = 0; i < results.length; i++) {
                results[i].orderTime = results[i].orderTime.Format("yyyy-MM-dd hh:mm:ss");
            }
            Promise.all(promises).then(() => {
                res.render("admin/order/order_show.html", { orders: results });
            });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.orderDetail = (req, res, next) => {
    let orderID = req.params.orderID;
    customerModel.orderDetail(orderID).then(result => {
        result[0].orderTime = result[0].orderTime.Format("yyyy-MM-dd hh:mm:ss");
        result[0].totalPrice = parseFloat(result[0].servicePrice) * result[0].amount;
        res.render("admin/order/orderDetail.html", { detail: result[0] });
    }).catch((err) => {
        util.errorHandle(err);
    });
}
exports.orderStatus = (req, res, next) => {
    customerModel.orders_UPD_Status(req.body.orderID, req.body.status)
        .then((result) => {
            if (result.serverStatus == "2") {
                res.json({ code: 1 }).end();
            } else {
                res.json({ code: 0 }).end();
            }
        }).catch((err) => {
            res.json({ code: 0 }).end();
            util.errorHandle(err);
        })
}
exports.orderNumber = (req, res, next) => {
    customerModel.orders_SEL_Working(req.session.islogin_admin.adminID)
        .then((results) => {
            let number = results.length;
            res.json({ num: number }).end();
        }).catch((err) => {
            util.errorHandle(err);
        });
}