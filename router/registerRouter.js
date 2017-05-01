'use strict';

var registerRouter = express.Router();
var registerService = require(rootpath.concat('/controller/registerService.js'));

registerRouter.post('/admin', util.uploadImg().single("portrait"), registerService.admin);
registerRouter.post('/customer', util.uploadCustomer().single("head"), registerService.customer);

module.exports = registerRouter;