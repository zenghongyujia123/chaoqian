/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_index');


module.exports = function (app) {
  app.route('/').get(index.index);
  app.route('/page/index/:city').get(index.index);
  app.route('/page/product_list').get(index.product_list);
  app.route('/page/product_detail/:product_id').get(index.product_detail);
  app.route('/page/backend_signin').get(index.backend_signin);

  app.route('/page/city_select').get(index.city_select);
};