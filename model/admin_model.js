'use strict';

//TABLE admin
exports.admin_Login = (username, password) => {
    let sql = "select * from admin where email = ? and adminPwd = ?";
    return util.getConn().queryAsync(sql, [username, password]);
}

//TABLE indexAboutMe
exports.indexAboutMe_SEL = (adminID) => {
    let sql = "select * from indexAboutMe where adminID=?";
    return util.getConn().queryAsync(sql, [adminID]);
}
exports.indexAboutMe_UPD = (aboutme, myskill, mywill, adminID) => {
    let sql = "update indexAboutMe set aboutme=?,experience=?,willing=? where adminID=?";
    return util.getConn().queryAsync(sql, [aboutme, myskill, mywill, adminID]);
}
exports.indexAboutMe_INS = (adminID, aboutme, myskill, mywill) => {
    let sql = "insert into indexAboutMe values(?,?,?,?)";
    return util.getConn().queryAsync(sql, [adminID, aboutme, myskill, mywill]);
}

//TABLE resume
exports.resume_INS = (adminID, resumeName) => {
    let sql = "insert into resume values(default,?,?,0)";
    return util.getConn().queryAsync(sql, [adminID, resumeName]);
}
exports.resume_UPD = (resumeName, resumeID) => {
    let sql = "update resume set resumeName=? where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeName, resumeID]);
}
exports.resume_SEL_All = (adminID) => {
    let sql = "select * from resume where adminID=?";
    return util.getConn().queryAsync(sql, [adminID]);
}
exports.resume_SEL_one = (adminID, resumeName) => {
    let sql = "select * from resume where adminID=? and resumeName=?";
    return util.getConn().queryAsync(sql, [adminID, resumeName]);
}
exports.resume_SEL_byid = (resumeID) => {
    let sql = "select * from resume where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeID]);
}
exports.resume_DEL = (resumeID) => {
    let sql = "delete from resume where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeID]);
}

//TABLE resumeMain
exports.resumeMain_INS = (resumeID, userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus) => {
    let sql = "insert into resumeMain values(?,?,?,?,?,?,'computer',?,?,?,?,?,null,?,?,?)";
    return util.getConn().queryAsync(sql, [resumeID, userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus]);
}
exports.resumeMain_UPD = (resumeID, userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus) => {
    let sql = "update resumeMain set userName=?,sex=?,birth=?,nativePlace=?,highestQualification=?,specialty='computer',workYear=?,tel=?,mailbox=?,jobspecification=?,willSpot=?,promisingIndustry=?,userImg=?,workStatus=? where resumeID=?";
    return util.getConn().queryAsync(sql, [userName, sex, birth, nativePlace, highestQualification, workYear, tel, mailbox, jobspecification, willSpot, promisingIndustry, userImg, workStatus, resumeID]);
}
exports.resumeMain_SEL = (resumeID) => {
    let sql = "select * from resumeMain where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeID]);
}
exports.resumeMain_DEL = (resumeID) => {
    let sql = "delete from resumeMain where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeID]);
}

//TABLE resumeSub
exports.resumeSub_INS = (resumeID, educationExperience, trainingExperience, workExperience, specializeSkill) => {
    let sql = "insert into resumeSub values(?,?,?,?,?)";
    return util.getConn().queryAsync(sql, [resumeID, educationExperience, trainingExperience, workExperience, specializeSkill]);
}
exports.resumeSub_UPD = (resumeID, educationExperience, trainingExperience, workExperience, specializeSkill) => {
    let sql = "update resumeSub set educationExperience=?,trainingExperience=?,workExperience=?,specializeSkill=? where resumeID=?";
    return util.getConn().queryAsync(sql, [educationExperience, trainingExperience, workExperience, specializeSkill, resumeID]);
}
exports.resumeSub_SEL = (resumeID) => {
    let sql = "select * from resumeSub where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeID]);
}
exports.resumeSub_DEL = (resumeID) => {
    let sql = "delete from resumeSub where resumeID=?";
    return util.getConn().queryAsync(sql, [resumeID]);
}