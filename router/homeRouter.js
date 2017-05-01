'use strict';
var homeRouter = express.Router();
var homeService = require(rootpath.concat('/controller/homeService.js'));

homeRouter.get('/:user', util.checkAdmin, homeService.index);
homeRouter.get('/:user/resume', util.checkAdmin, homeService.resume);
homeRouter.get('/:user/works', util.checkAdmin, homeService.works);
homeRouter.get('/:user/business', util.checkAdmin, homeService.business);
homeRouter.post('/towork', homeService.typeToWork);
homeRouter.post('/toservice', homeService.typeToService);
homeRouter.post('/order', homeService.order);

module.exports = homeRouter;