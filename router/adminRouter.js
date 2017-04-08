'use strict';
var adminRouter = express.Router();
var adminService = require(rootpath.concat('/controller/adminService.js'));


adminRouter.get('', adminService.index);

adminRouter.get('/indexchange', adminService.indexChange);
adminRouter.get('/indexshow', adminService.indexShow);
adminRouter.post('/indexchange', adminService.indexDoChange);

adminRouter.get('/resumeshow', adminService.resumeShow);
adminRouter.get('/resumechange', adminService.resumeChange);
adminRouter.post('/resumechange', util.uploadFile().single("userImg"), adminService.resumeDoChange);
adminRouter.get('/changeresume/:resumeID', adminService.resumeToChange);
adminRouter.get('/resumedelete', adminService.resumeDelete);
adminRouter.get('/resumeadd', adminService.resumeAdd);
adminRouter.post('/resumeadd', util.uploadFile().single("userImg"), adminService.resumeDoAdd);
adminRouter.get('/resumedetail/:resumeID', adminService.resumeDetail);

adminRouter.get('/myworkshow', adminService.myworkShow);
adminRouter.get('/myworkchange', adminService.myworkChange);

adminRouter.get('/businessshow', adminService.businessShow);
adminRouter.get('/businesschange', adminService.businessChange);

adminRouter.get('/ordershow', adminService.orderShow);

module.exports = adminRouter;