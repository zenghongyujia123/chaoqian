/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');


module.exports = function (app) {
  app.route('/page_wechat/result').get(index.result);
  app.route('/page_wechat/product_detail').get(index.product_detail);
  app.route('/page_wechat/question').get(index.question);
  app.route('/page_wechat/home').get(index.home);
};