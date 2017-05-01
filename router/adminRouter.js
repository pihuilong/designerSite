'use strict';
var adminRouter = express.Router();
var adminService = require(rootpath.concat('/controller/adminService.js'));


adminRouter.get('', adminService.index);

adminRouter.get('/indexchange', adminService.indexChange);
adminRouter.get('/indexshow', adminService.indexShow);
adminRouter.post('/indexchange', adminService.indexDoChange);

adminRouter.get('/resumeshow', adminService.resumeShow);
adminRouter.get('/resumechange', adminService.resumeChange);
adminRouter.post('/resumechange', util.uploadImg().single("userImg"), adminService.resumeDoChange);
adminRouter.get('/changeresume/:resumeID', adminService.resumeToChange);
adminRouter.get('/resumedelete', adminService.resumeDelete);
adminRouter.get('/resumeadd', adminService.resumeAdd);
adminRouter.post('/resumeadd', util.uploadImg().single("userImg"), adminService.resumeDoAdd);
adminRouter.get('/resumedetail/:resumeID', adminService.resumeDetail);

adminRouter.get('/editbase', adminService.editBase);
adminRouter.post('/editbase', util.uploadImg().single("portrait"), adminService.doEditBase);

adminRouter.get('/myworkshow', adminService.myworkShow);
adminRouter.get('/myworktype', adminService.myworkType);
adminRouter.get('/myworkupload', adminService.myworkUpload);
adminRouter.get('/myworkchange', adminService.myworkChange);
adminRouter.get('/workitemmodify', adminService.workItemModify);
adminRouter.get('/workitemshow', adminService.workItemShow);
adminRouter.post('/worktypeadd', adminService.workTypeAdd);
adminRouter.post('/worktypedelete', adminService.workTypeDel);
adminRouter.post('/worktypechg', adminService.workTypeChg);
adminRouter.post('/myworkupload', util.uploadWorkImg().array("workImg", 9), adminService.myworkDoUpload);
adminRouter.post('/workdelete', adminService.workDelete);
adminRouter.post('/workchg', adminService.workChg);

adminRouter.get('/businessshow', adminService.businessShow);
adminRouter.get('/businesschange', adminService.businessChange);
adminRouter.get("/businessadd", adminService.businessAdd);
adminRouter.get('/businesstype', adminService.businessType);
adminRouter.get('/serviceitemmodify', adminService.serviceItemModify);
adminRouter.get('/serviceitemshow', adminService.serviceItemShow);
adminRouter.post('/businesstypeadd', util.uploadBusiness().single("typeImg"), adminService.businessTypeAdd);
adminRouter.post('/businesstypedelete', adminService.businessTypeDel);
adminRouter.post('/businesstypechg', util.uploadBusiness().single("typeImg"), adminService.businessTypeChg);
adminRouter.post("/businessadd", util.uploadBusiness().single("serviceImg"), adminService.businessDoAdd);
adminRouter.post('/businessdelete', adminService.businessDelete);
adminRouter.post('/businesschg', adminService.businessChg);

adminRouter.get('/ordershow/:typeID', adminService.orderShow);
adminRouter.get('/orderdetail/:orderID', adminService.orderDetail);
adminRouter.get('/orderNum', adminService.orderNumber);
adminRouter.post('/orderstatus', adminService.orderStatus);

module.exports = adminRouter;