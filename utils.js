'use strict';

//数据库操作接口
var mysql = require('mysql');
Promise.promisifyAll(require("mysql/lib/Connection").prototype); //将所有MySQL中的connectionPromise化
exports.getConn = () => {
    //连接数据库
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'designersite'
    });
    return connection;
}


//检查管理员是否登录
exports.checklogin = (req, res, next) => {
    if (!req.session.islogin_admin) {
        return res.redirect("/admin_login.html");
    }
    next();
}

//使用multer配置文件上传
var multer = require("multer");
exports.uploadFile = () => {
    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function(req, file, cb) {
            cb(null, './public/uploads')
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