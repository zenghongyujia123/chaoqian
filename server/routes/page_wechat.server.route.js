/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var payController = require('../controllers/wechat_pay_page');
var userFilter = require('../filters/user');
var creditPeopleFilter = require('../filters/credit_people');

var productFilter = require('../filters/product');


module.exports = function (app) {
  app.route('/page_wechat/result').get(index.result);
  app.route('/page_wechat/product_detail').get(productFilter.requireProduct, index.product_detail);
  app.route('/page_wechat/question').get(userFilter.requireUser, index.question);
  app.route('/page_wechat/home').get(index.home);
  app.route('/page_wechat/me').get(index.me);
  app.route('/page_wechat/signin').get(index.signin);
  app.route('/page_wechat/signup').get(index.signup);
  app.route('/page_wechat/me_info').get(index.me_info);
  app.route('/page_wechat/me_business').get(index.me_business);
  app.route('/page_wechat/me_vip').get(index.me_vip);
  app.route('/page_wechat/apply_third').get(index.apply_third);
  app.route('/page_wechat/card_home').get(index.card_home);
  app.route('/page_wechat/card_detail').get(index.card_detail);
  app.route('/page_wechat/card_list').get(index.card_list);
  app.route('/page_wechat/card_progress').get(index.card_progress);
  app.route('/page_wechat/self_home').get(index.self_home);
  app.route('/page_wechat/self_local').get(index.self_local);
  app.route('/page_wechat/credit_people_detail').get(creditPeopleFilter.requireCreditPeople, index.credit_people_detail);
  app.route('/page_wechat/pay_test').get(payController.pay_test);
  app.route('/page_wechat/notify_url').post(payController.notify_url);
  app.route('/page_wechat/token_verify').get(payController.token_verify);

  app.route('/page_wechat/vip_base_info').get(index.vip_base_info);
  app.route('/page_wechat/vip_auth_info').get(index.vip_auth_info);
  app.route('/page_wechat/vip_notice').get(index.vip_notice);
};