/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var payController = require('../controllers/wechat_pay');
var userFilter = require('../filters/user');
var thirdQueryFilter = require('../filters/third_query');


var creditPeopleFilter = require('../filters/credit_people');
var cardFilter = require('../filters/card');


var productFilter = require('../filters/product');


module.exports = function (app) {
  app.route('/page_wechat/result').get(userFilter.requireUser, index.result);
  app.route('/page_wechat/product_detail').get(productFilter.requireProduct, index.product_detail);
  app.route('/page_wechat/question').get(userFilter.requireUser, index.question);
  app.route('/page_wechat/home').get(index.home);
  app.route('/page_wechat/paycredit').get(userFilter.requireUser, index.paycredit);
  app.route('/page_wechat/page_query_main').get(userFilter.requireUser, index.page_query_main);
  app.route('/page_wechat/page_query_create').get(index.page_query_create);
  app.route('/page_wechat/page_query_create_result').get(index.page_query_create_result);
  app.route('/page_wechat/page_query_list').get(userFilter.requireUser, index.page_query_list);
  app.route('/page_wechat/me').get(userFilter.requireUser, index.me);
  app.route('/page_wechat/signin').get(index.signin);
  app.route('/page_wechat/signup').get(index.signup);
  app.route('/page_wechat/me_info').get(userFilter.requireUser, index.me_info);
  app.route('/page_wechat/me_business').get(userFilter.requireUser, index.me_business);
  app.route('/page_wechat/me_vip').get(userFilter.requireUser, index.me_vip);
  app.route('/page_wechat/me_bill').get(userFilter.requireUser, index.me_bill);
  app.route('/page_wechat/me_agent').get(userFilter.requireUser, index.me_agent);
  app.route('/page_wechat/me_query_detail').get(userFilter.requireUser, thirdQueryFilter.requireThirdQuery, index.me_query_detail);
  app.route('/page_wechat/me_query').get(userFilter.requireUser, index.me_query);

  app.route('/page_wechat/me_account').get(userFilter.requireUser, index.me_account);
  app.route('/page_wechat/me_achievement').get(userFilter.requireUser, index.me_achievement);
  app.route('/page_wechat/apply_third').get(userFilter.requireUser, index.apply_third);

  app.route('/page_me_share/:code').get(index.me_share);

  app.route('/page_wechat/apply_third').get(userFilter.requireUser, index.apply_third);
  app.route('/page_wechat/card_home').get(userFilter.requireUser, index.card_home);
  app.route('/page_wechat/card_detail').get(userFilter.requireUser, cardFilter.requireCard, index.card_detail);
  app.route('/page_wechat/card_list').get(userFilter.requireUser, index.card_list);
  app.route('/page_wechat/card_progress').get(userFilter.requireUser, index.card_progress);
  app.route('/page_wechat/self_home').get(userFilter.requireUser, index.self_home);
  app.route('/page_wechat/self_jietiao').get(userFilter.requireUser, index.self_jietiao);
  app.route('/page_wechat/self_local').get(userFilter.requireUser, index.self_local);
  app.route('/page_wechat/credit_people_detail').get(userFilter.requireUser, creditPeopleFilter.requireCreditPeople, index.credit_people_detail);
  app.route('/page_wechat/notify_url').post(payController.notify_url);
  app.route('/page_wechat/token_verify').get(userFilter.requireUser, payController.token_verify);

  app.route('/page_wechat/banner').get(index.banner);

  app.route('/page_wechat/vip_base_info').get(userFilter.requireUser, index.vip_base_info);
  app.route('/page_wechat/vip_auth_info').get(userFilter.requireUser, index.vip_auth_info);
  app.route('/page_wechat/vip_auth_1').get(userFilter.requireUser, index.vip_auth_1);
  app.route('/page_wechat/vip_auth_2').get(userFilter.requireUser, index.vip_auth_2);
  app.route('/page_wechat/vip_auth_3').get(userFilter.requireUser, index.vip_auth_3);
  app.route('/page_wechat/vip_auth_report').get(userFilter.requireUser, index.vip_auth_report);
  app.route('/page_wechat/vip_notice').get(userFilter.requireUser, index.vip_notice);
  app.route('/page_wechat/vip_result').get(userFilter.requireUser, index.vip_result);
  app.route('/page_wechat/vip_result_feedback').get(userFilter.requireUser, index.vip_result_feedback);
  app.route('/page_wechat/vip_result_refuse').get(userFilter.requireUser, index.vip_result_refuse);
  
  app.route('/page_wechat/invite_notice').get(userFilter.requireUser, index.invite_notice);
  app.route('/page_wechat/page_image').get(index.page_image);
  app.route('/page_wechat/page_images').get(index.page_images);
  app.route('/page_wechat/page_contract_list').get(index.page_contract_list);
  app.route('/page_wechat/page_reward').get(index.page_reward);
  app.route('/page_wechat/page_refresh_reward').get(index.page_refresh_reward);
  app.route('/page_wechat/postcode_my_list').get(userFilter.requireUser, index.postcode_my_list);
  app.route('/page_wechat/postcode_detail').get(userFilter.requireUser, index.postcode_detail);
};