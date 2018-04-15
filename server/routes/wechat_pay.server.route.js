/**
 * Created by zenghong on 2017/8/8.
 */

var payController = require('../controllers/wechat_pay');
var userFilter = require('../filters/user');

module.exports = function (app) {
  // app.route('/page_wechat/getPrePayId').post(userFilter.requireUser, payController.getPrePayId);
  // app.route('/page_wechat/getPrePayId4PayCredit').post(userFilter.requireUser, payController.getPrePayId4PayCredit);
  ///page_wechat/getPrePayId4PayCredit
  // app.route('/page_wechat/getPayPage').get(userFilter.requireUser, payController.getPayPage);
  // app.route('/page_wechat/getUserJsApiTicket').post(payController.getUserJsApiTicket);

  
  app.route('/api_wechat/getUserJsApiTicket').post( payController.getUserJsApiTicket);
  app.route('/api_wechat_pay/payment/get_pre_pay_id').post(userFilter.requireUser, payController.get_pre_pay_id);
  app.route('/api_wechat_pay/payment/get_pre_pay_info').post(userFilter.requireUser, payController.get_pre_pay_info);
  app.route('/api_wechat_pay/payment/vip_pay_notify_url').post(payController.vip_pay_notify_url);

};