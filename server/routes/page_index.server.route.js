/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_index');

module.exports = function (app) {
  app.route('/').get(index.index);
  app.route('/product_list').get(index.product_list);
  app.route('/product_detail').get(index.product_detail);
  app.route('/backend_signin').get(index.backend_signin);
};