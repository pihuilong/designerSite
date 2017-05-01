'use strict';

//数据库操作接口
var mysql = require('mysql');
Promise.promisifyAll(require("mysql/lib/Connection").prototype); //将所有MySQL中的connectionPromise化
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
exports.getConn = () => {
    //连接数据库
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'designersite'
    });
    return pool.getConnectionAsync().disposer(function(connection) {
        try {
            // connection.release();
            connection.destroy();
        } catch (e) { console.log(e) };
    });
}


//检查管理员是否登录
exports.checklogin = (req, res, next) => {
    if (!req.session.islogin_admin) {
        return res.redirect("/admin_login.html");
    }
    next();
}

//检查是否存在某管理员
exports.checkAdmin = (req, res, next) => {
    let admin = req.params.user;
    adminModel.admin_exist(admin).then((adminResult) => {
        if (adminResult.length == 1) {
            req.params.adminID = adminResult[0].adminID;
            req.params.email = adminResult[0].email;
            req.params.portrait = adminResult[0].portrait;
            next();
        } else {
            res.redirect('/404.html');
        }
    });
}

//检查客户是否登录
exports.checkloginCustomer = (req, res, next) => {
    if (!req.session.customer) {
        return res.redirect("/customer_login.html");
    }
    next();
}


//使用multer配置文件上传
var multer = require("multer");
exports.uploadImg = () => {
    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹不会自动创建。
        destination: function(req, file, cb) {
            cb(null, './public/uploads/admin')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });

    return multer({
        storage: storage,
        limits: {}
    });
}
exports.uploadWorkImg = () => {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/works')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });
    return multer({
        storage: storage,
        limits: {}
    });
}
exports.uploadBusiness = () => {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/service');
        },
        //给上传文件重命名，获取添加后缀名
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });

    return multer({
        storage: storage,
        limits: {}
    });
}
exports.uploadCustomer = () => {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/customer')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });

    return multer({
        storage: storage,
        limits: {}
    });
}



//删除文件
exports.fileDelete = (wholePath) => {
    fs.exists(wholePath, (exists) => {
        if (exists) {
            fs.unlinkAsync(wholePath).then((err) => {
                if (err) {
                    console.log("未能删除文件：" + wholePath + " 原因如下");
                    console.log(err.stack);
                } else {
                    console.log("成功删除文件" + wholePath);
                }
            });
        }
    });
}

exports.errorHandle = (err) => {
    console.log('Time: ', new Date().Format("yyyy-MM-dd hh:mm:ss"));
    console.log(err.stack);
}


// 转换日期格式
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}