'use strict';
var loginRouter = express.Router();
var loginService = require(rootpath.concat('/controller/loginService.js'));


loginRouter.post('/', loginService.login);

module.exports = loginRouter;