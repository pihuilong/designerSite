'use strict';

global.Promise = require("bluebird");
global.express = require('express');
global.fs = Promise.promisifyAll(require("fs"));
global.rootpath = __dirname;
global.util = require('./utils.js');
global.adminModel = require('./model/admin_model.js');
global.customerModel = require('./model/customer_model.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs'); //使用ejs渲染页面

var app = express();

//https服务器 暂时不用
// var https = require('https');
// var privateKey = fs.readFileSync('privatekey.pem', 'utf8');
// var certificate = fs.readFileSync('certificate.pem', 'utf8');
// var credentials = { key: privateKey, cert: certificate };
// var httpsServer = https.createServer(credentials, app);


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

//首页
app.get("/", (req, res) => {
    adminModel.admin_SEL_All().then((results) => {
        res.render('index.html', { admins: results });
    }).catch((err) => { util.errorHandle(err) });
});

// 挂载路由表
app.use("/home", require('./router/homeRouter.js')); //设计师主页路由表
app.use("/login", require('./router/loginRouter.js')); //登录路由表
app.use("/register", require('./router/registerRouter.js')); //注册路由表
app.use("/admin", util.checklogin, require('./router/adminRouter.js')); //设计师后台路由表
app.use("/customer", util.checkloginCustomer, require('./router/customerRouter.js'));



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
        console.log('Time: ', new Date().Format("yyyy-MM-dd hh:mm:ss"));
        console.log(err.stack);
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