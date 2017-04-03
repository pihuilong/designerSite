'use strict';
var adminRouter = express.Router();
var adminService = require(rootpath.concat('/controller/adminService.js'));


adminRouter.get('/', adminService.index);

adminRouter.get('/indexchange', adminService.indexChange);
adminRouter.get('/indexshow', adminService.indexShow);
adminRouter.post('/indexchange', adminService.indexDoChange);

adminRouter.get('/resumeshow', adminService.resumeShow);
adminRouter.get('/resumechange', adminService.resumeChange);

adminRouter.get('/myworkshow', adminService.myworkShow);
adminRouter.get('/myworkchange', adminService.myworkChange);

adminRouter.get('/businessshow', adminService.businessShow);
adminRouter.get('/businesschange', adminService.businessChange);

adminRouter.get('/ordershow', adminService.orderShow);

module.exports = adminRouter;