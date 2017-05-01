'use strict';
var customerRouter = express.Router();
var customerService = require(rootpath.concat('/controller/customerService.js'));

customerRouter.get('', customerService.index);

module.exports = customerRouter;