/**
 * Created by zenghong on 2017/8/8.
 */

var payController = require('../controllers/page_lianlian');
var userFilter = require('../filters/user');

module.exports = function (app) {
  // app.route('/page_wechat/getPrePayId').post(userFilter.requireUser, payController.getPrePayId);
  // app.route('/page_wechat/getPrePayId4PayCredit').post(userFilter.requireUser, payController.getPrePayId4PayCredit);
  ///page_wechat/getPrePayId4PayCredit
  // app.route('/page_wechat/getPayPage').get(userFilter.requireUser, payController.getPayPage);
  // app.route('/page_wechat/getUserJsApiTicket').post(payController.getUserJsApiTicket);
  app.route('/lianlian_pay/page_lianlian').get(payController.page_lianlian);
};