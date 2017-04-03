'use strict';

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