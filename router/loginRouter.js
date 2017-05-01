'use strict';
var loginRouter = express.Router();
var loginService = require(rootpath.concat('/controller/loginService.js'));


loginRouter.post('/admin', loginService.adminLogin);
loginRouter.get('/adminlogout', loginService.adminLogout);
loginRouter.post('/customer', loginService.customerLogin);
loginRouter.get('/customerlogout', loginService.customerLogout);

module.exports = loginRouter;