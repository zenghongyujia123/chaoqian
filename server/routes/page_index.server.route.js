/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_index');
var partnerFilter = require('../filters/partner');




module.exports = function (app) {
  app.route('/').get(index.index);
  app.route('/mip').get(index.home_mip);
  app.route('/page/index/:city').get(index.index);
  app.route('/page/product_list').get(index.product_list);
  app.route('/page/product_detail/:product_id').get(index.product_detail);
  app.route('/page/article_detail/:article_id').get(index.article_detail);
  app.route('/page/backend_signin').get(index.backend_signin);
  app.route('/page/partner_signin').get(index.partner_signin);
  app.route('/page/partner_main').get(partnerFilter.requireUser, index.partner_main);


  app.route('/page/city_select').get(index.city_select);
};