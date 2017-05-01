'use strict';

exports.index = (req, res, next) => {
    let adminID = req.params.adminID;
    let promises = [];

    promises.push(adminModel.indexAboutMe_SEL(adminID));
    promises.push(adminModel.indexSkill_SEL(adminID));
    promises.push(adminModel.admin_SEL(adminID));
    promises.push(adminModel.workShow_SEL(adminID));
    promises.push(adminModel.serviceType_SEL(adminID));
    Promise.all(promises).then((results) => {
        let aboutme = JSON.parse(JSON.stringify(results[0]))[0];
        let skills = JSON.parse(JSON.stringify(results[1]));
        let adminInfo = JSON.parse(JSON.stringify(results[2]))[0];
        let works = JSON.parse(JSON.stringify(results[3]));
        let serviceTypes = JSON.parse(JSON.stringify(results[4]));
        res.render("visitor/index.html", { customer: req.session.customer, admin: adminInfo, about: aboutme, skills: skills, workshow: works, services: serviceTypes });
    }).catch((err) => {
        console.log(err.stack);
        res.redirect('/500.html');
    });
};

exports.resume = Promise.coroutine(function*(req, res, next) {
    let adminID = req.params.adminID;
    let adminTable = { adminID: adminID, adminName: req.params.user, email: req.params.email };
    let resume = yield adminModel.resume_SEL_display(adminID);
    let resumes = yield adminModel.resume_SEL_All(adminID);
    if (resume.length == 0 && resumes.length == 0) {
        return res.redirect("/404.html");
    } else {
        let resumeID = (typeof(resume[0]) == "undefined") ? resumes[0].resumeID : resume[0].resumeID;

        let promises = [];
        promises.push(adminModel.resumeMain_SEL(resumeID));
        promises.push(adminModel.resumeSub_SEL(resumeID));
        Promise.all(promises).then((results) => {
            let main = JSON.parse(JSON.stringify(results[0]))[0];
            let sub = JSON.parse(JSON.stringify(results[1]))[0];
            res.render("visitor/resume.html", { admin: adminTable, resume: resume[0], main: main, sub: sub });
        }).catch((err) => {
            console.log(err.stack);
            res.redirect('/500.html');
        });
    }
});

exports.works = (req, res, next) => {
    let adminID = req.params.adminID;
    let adminTable = { adminID: adminID, adminName: req.params.user, email: req.params.email };
    adminModel.worksType_SEL(adminID).then((result) => {
        res.render('visitor/mywork.html', { admin: adminTable, types: result });
    }).catch((err) => {
        console.log(err.stack);
        res.redirect('/500.html');
    });
}
exports.typeToWork = (req, res, next) => {
    adminModel.works_SEL(req.body.typeID).then((results) => {
        res.render('visitor/workItem.html', { works: results });
    }).catch((err) => {
        console.log(err.stack);
        res.end("发生了一些错误！请稍后再试。");
    });
}

exports.business = (req, res, next) => {
    let adminID = req.params.adminID;
    let adminTable = { adminID: adminID, adminName: req.params.user, email: req.params.email };
    adminModel.serviceType_SEL(adminID).then((result) => {
        if (typeof(req.session.customer) == "undefined") {
            req.session.customer = { customerID: "-1" }
        }
        res.render('visitor/business.html', { admin: adminTable, types: result, customer: req.session.customer });
    }).catch((err) => {
        console.log(err.stack);
        res.redirect('/500.html');
    });
}
exports.typeToService = (req, res, next) => {
    adminModel.service_SEL(req.body.typeID).then((results) => {
        res.render('visitor/businessItem.html', { services: results });
    }).catch((err) => {
        console.log(err.stack);
        res.end("发生了一些错误！请稍后再试。");
    });
}
exports.order = (req, res, next) => { //下订单
    let orderTime = new Date(req.body.orderTime).Format("yyyy-MM-dd hh:mm:ss");
    customerModel.orders_INS(req.body.customerID, req.body.adminID, req.body.serviceID, req.body.amount, orderTime, req.body.orderDesc)
        .then((result) => {
            if (result.serverStatus == "2") {
                res.json({ success: 1 }).end();
            } else {
                res.json({ success: 0 }).end();
            }
        }).catch((err) => {
            res.json({ success: 0 }).end();
            util.errorHandle(err);
        });
}