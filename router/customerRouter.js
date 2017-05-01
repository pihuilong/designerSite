'use strict';
var customerRouter = express.Router();
var customerService = require(rootpath.concat('/controller/customerService.js'));

customerRouter.get('', customerService.index);

customerRouter.get('/infochange', customerService.infoChange);
customerRouter.post('/infochange', util.uploadCustomer().single("photo"), customerService.infoDoChange);

customerRouter.get('/ordershow/:typeID', customerService.orderShow);
customerRouter.get('/orderdetail/:orderID', customerService.orderDetail);

module.exports = customerRouter;