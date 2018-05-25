/**
 * Created by zenghong on 2017/8/8.
 */

var pbcController = require('../controllers/shuju_mofang');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/shuju_mofang_callback_taobao').get(pbcController.shuju_mofang_callback_taobao);
  app.route('/shuju_mofang_page_taobao').get(userFilter.requireUser, pbcController.shuju_mofang_page_taobao);
  
  app.route('/shuju_mofang_callback_jingdong').get(pbcController.shuju_mofang_callback_jingdong);
  app.route('/shuju_mofang_page_jingdong').get(userFilter.requireUser, pbcController.shuju_mofang_page_jingdong);
};