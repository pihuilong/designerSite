'use strict';

global.Promise = require("bluebird");
global.express = require('express');
global.rootpath = __dirname;
global.util = require('./utils.js');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var ejs = require('ejs'); //使用ejs渲染页面
var upload = multer({ dest: './public/uploads/' }) // for parsing multipart/form-data

var app = express();

// 配置post req.body解析中间件
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); 

//配置ejs模板 渲染模板
app.set("views", "./views"); //代表模板存放的目录
app.set("view engine", "html"); //配置模板引擎，模板中文件后缀名为.html
app.engine(".html", ejs.__express); //ejs与express进行匹配

//配置session
app.use(session({
    secret: 'welldone1335!@',
    resave: false,
    saveUninitialized: true
}));

// 配置静态目录
app.use(express.static('public'));

// 挂载路由表
app.use("/login", require('./router/loginRouter.js'));
app.use("/admin", util.checklogin, require('./router/adminRouter.js'));




//404错误中间件 
app.use((req, res, next) => {
    // 如果是通过Ajax请求过来的，只发送状态码404；否则重定向到404错误页面
    if (req.xhr) {
        res.sendStatus(404);
    } else {
        res.status(302).set("Location", "/404.html").end();
    }
});
//服务器内部错误处理
app.use((err, req, res, next) => {
    // 如果是通过Ajax请求过来的，只发送状态码500；否则重定向到500错误页面
    if (req.xhr) {
        res.sendStatus(500);
    } else {
        console.log(err.stack);
        res.status(302).set("Location", "/500.html").end();
    }
});
//守护中间件 当发生了未捕获的异常(比如文件丢失，内存泄露等无法被Express捕获的异常),主要是通过Nodejs中的process(全局)处理
//这样不会导致服务器崩溃
process.on('uncaughtException', (err) => {
    console.log("caught exception: ${err}");
});
//绑定并监听特定主机端口的连接
var server = app.listen(8080, () => {
    let port = server.address().port;
    let host = server.address().address;
    console.log('服务器已启动！');
    console.log('Time: ', new Date().Format("yyyy-MM-dd hh:mm:ss"));
    console.log('监听的地址为：http://%s:%s', host, port);
});