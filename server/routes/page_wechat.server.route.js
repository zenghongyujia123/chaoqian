/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var userFilter = require('../filters/user');


module.exports = function (app) {
  app.route('/page_wechat/result').get(index.result);
  app.route('/page_wechat/product_detail').get(index.product_detail);
  app.route('/page_wechat/question').get(userFilter.requireUser, index.question);
  app.route('/page_wechat/home').get(index.home);
  app.route('/page_wechat/me').get(index.me);
  app.route('/page_wechat/signin').get(index.signin);
  app.route('/page_wechat/signup').get(index.signup);
  app.route('/page_wechat/me_info').get(index.me_info);
  app.route('/page_wechat/me_business').get(index.me_business);
  app.route('/page_wechat/me_vip').get(index.me_vip);
  app.route('/page_wechat/apply_third').get(index.apply_third);
};