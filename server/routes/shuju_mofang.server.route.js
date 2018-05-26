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

  app.route('/shuju_mofang_callback_yys').get(pbcController.shuju_mofang_callback_yys);
  app.route('/shuju_mofang_page_yys').get(userFilter.requireUser, pbcController.shuju_mofang_page_yys);

  app.route('/shuju_mofang_callback_eb').get(pbcController.shuju_mofang_callback_eb);
  app.route('/shuju_mofang_page_eb').get(userFilter.requireUser, pbcController.shuju_mofang_page_eb);
};