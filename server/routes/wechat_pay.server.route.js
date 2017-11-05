/**
 * Created by zenghong on 2017/8/8.
 */

var payController = require('../controllers/wechat_pay');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/page_wechat/getPrePayId').post(userFilter.requireUser, payController.getPrePayId);
};