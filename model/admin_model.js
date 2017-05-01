'use strict';

//TABLE admin
exports.admin_Login = (username, password) => {
    let sql = "select * from admin where email = ? and adminPwd = ?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [username, password]);
    });
}
exports.admin_SEL = (adminID) => {
    let sql = "select adminName,email,portrait from admin where adminID = ?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.admin_SEL_All = () => {
    let sql = "select adminName,email,portrait from admin";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql);
    });
}
exports.admin_exist = (admin) => {
    let sql = "select adminID,adminName,email,portrait from admin where adminName = ?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [admin]);
    });
}
exports.email_exist = (email) => {
    let sql = "select * from admin where email = ?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [email]);
    });
}
exports.admin_UDP_portrait = (adminID, portrait) => {
    let sql = "update admin set portrait=? where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [portrait, adminID]);
    });
}
exports.admin_INS = (adminName, adminPwd, email, portrait) => {
    let sql = "insert into admin values(default,?,?,0,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminName, adminPwd, email, portrait]);
    });
}

//TABLE indexAboutMe
exports.indexAboutMe_SEL = (adminID) => {
    let sql = "select * from indexAboutMe where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.indexAboutMe_UPD = (aboutme, myskill, mywill, adminID) => {
    let sql = "update indexAboutMe set aboutme=?,experience=?,willing=? where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [aboutme, myskill, mywill, adminID]);
    });
}
exports.indexAboutMe_INS = (adminID, aboutme, myskill, mywill) => {
    let sql = "insert into indexAboutMe values(?,?,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID, aboutme, myskill, mywill]);
    });
}

//TABLE indexSkill
exports.indexSkill_SEL = (adminID) => {
    let sql = "select * from indexSkill where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.indexSkill_UPD = (skillID, skill) => {
    let sql = "update indexSkill set skill=? where skillID=? ";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [skill, skillID]);
    });
}
exports.indexSkill_INS = (adminID, skill) => {
    let sql = "insert into indexSkill values(default,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID, skill]);
    });
}

//TABLE resume
exports.resume_INS = (adminID, resumeName) => {
    let sql = "insert into resume values(default,?,?,0)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID, resumeName]);
    });
}
exports.resume_UPD = (resumeName, resumeID, diplay) => {
    let sql = "update resume set resumeName=?,isShow=? where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeName, diplay, resumeID]);
    });
}
exports.resume_NotShow = (adminID) => {
    let sql = "update resume set isShow=0 where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.resume_SEL_All = (adminID) => {
    let sql = "select * from resume where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.resume_SEL_one = (adminID, resumeName) => {
    let sql = "select * from resume where adminID=? and resumeName=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID, resumeName]);
    });
}
exports.resume_SEL_display = (adminID) => {
    let sql = "select * from resume where adminID=? and isShow=1";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.resume_SEL_byid = (resumeID) => {
    let sql = "select * from resume where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID]);
    });
}
exports.resume_DEL = (resumeID) => {
    let sql = "delete from resume where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID]);
    });
}

//TABLE resumeMain
exports.resumeMain_INS = (resumeID, userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus) => {
    let sql = "insert into resumeMain values(?,?,?,?,?,?,'computer',?,?,?,?,?,null,?,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID, userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus]);
    });
}
exports.resumeMain_UPD = (resumeID, userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus) => {
    let sql = "update resumeMain set userName=?,sex=?,birth=?,nativePlace=?,highestQualification=?,specialty='computer',workYear=?,tel=?,mailbox=?,jobspecification=?,willSpot=?,promisingIndustry=?,userImg=?,workStatus=? where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus, resumeID]);
    });
}
exports.resumeMain_SEL = (resumeID) => {
    let sql = "select * from resumeMain where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID]);
    });
}
exports.resumeMain_DEL = (resumeID) => {
    let sql = "delete from resumeMain where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID]);
    });
}

//TABLE resumeSub
exports.resumeSub_INS = (resumeID, educationExperience, trainingExperience, workExperience, specializeSkill) => {
    let sql = "insert into resumeSub values(?,?,?,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID, educationExperience, trainingExperience, workExperience, specializeSkill]);
    });
}
exports.resumeSub_UPD = (resumeID, educationExperience, trainingExperience, workExperience, specializeSkill) => {
    let sql = "update resumeSub set educationExperience=?,trainingExperience=?,workExperience=?,specializeSkill=? where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [educationExperience, trainingExperience, workExperience, specializeSkill, resumeID]);
    });
}
exports.resumeSub_SEL = (resumeID) => {
    let sql = "select * from resumeSub where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID]);
    });
}
exports.resumeSub_DEL = (resumeID) => {
    let sql = "delete from resumeSub where resumeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [resumeID]);
    });
}

//Table worksType
exports.worksType_INS = (adminID, typeName, typeDescription) => {
    let sql = "insert into worksType values(default,?,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID, typeName, typeDescription]);
    });
}
exports.worksType_SEL = (adminID) => {
    let sql = "select * from worksType where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.worksType_DEL = (typeID) => {
    let sql = "delete from worksType where typeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeID]);
    });
}
exports.worksType_UPD = (typeID, typeName, typeDescription) => {
    let sql = "update worksType set typeName=?,typeDescription=? where typeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeName, typeDescription, typeID]);
    });
}

//Table works
exports.works_INS = (typeID, worksName, worksIntro, workImg, workHyperLink, showIndex) => {
    let sql = "insert into works values(default,?,?,?,?,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeID, worksName, worksIntro, workImg, workHyperLink, showIndex]);
    });
}
exports.works_SEL = (typeID) => {
    let sql = "select * from works where typeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeID]);
    });
}
exports.work_DEL = (worksID) => {
    let sql = "delete from works where worksID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [worksID]);
    });
}
exports.works_UPD = (worksID, worksName, worksIntro, workHyperLink, showIndex) => {
    let sql = "update works set worksName=?,worksIntro=?,workHyperLink=?,showIndex=? where worksID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [worksName, worksIntro, workHyperLink, showIndex, worksID]);
    });
}

//Table serviceType
exports.serviceType_INS = (adminID, typeName, typeDescription, typeImg) => {
    let sql = "insert into serviceType values(default,?,?,?,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID, typeName, typeImg, typeDescription]);
    });
}
exports.serviceType_SEL = (adminID) => {
    let sql = "select * from serviceType where adminID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.serviceType_DEL = (typeID) => {
    let sql = "delete from serviceType where typeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeID]);
    });
}
exports.serviceType_UPD = (typeID, typeName, typeDescription, typeImg) => {
    let sql = "update serviceType set typeName=?,typeDescription=?,typeImg=? where typeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeName, typeDescription, typeImg, typeID]);
    });
}

//Table service
exports.service_INS = (typeID, serviceName, serviceDescription, servicePrice, serviceImg) => {
    let sql = "insert into service values(default,?,?,?,?,0,?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeID, serviceName, serviceDescription, servicePrice, serviceImg]);
    });
}
exports.service_SEL = (typeID) => {
    let sql = "select * from service where typeID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [typeID]);
    });
}
exports.service_DEL = (serviceID) => {
    let sql = "delete from service where serviceID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [serviceID]);
    });
}
exports.service_UPD = (serviceID, serviceTitle, serviceDescription, servicePrice) => {
    let sql = "update service set serviceTitle=?,serviceDescription=?,servicePrice=? where serviceID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [serviceTitle, serviceDescription, servicePrice, serviceID]);
    });
}




//Table works & worksType
exports.workShow_SEL = (adminID) => {
    let sql = "SELECT works.worksName,works.worksIntro,works.workHyperLink,works.workImg from works,worksType where adminID=? and works.typeID=worksType.typeID and works.showIndex='1'";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}