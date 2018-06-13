/**
 * Created by zenghong on 2017/8/8.
 */

var productController = require('../controllers/product');
var productFilter = require('../filters/product');

module.exports = function (app) {
  app.route('/product/updateProduct').post(productController.updateProduct);
  app.route('/product/productList').post(productController.productList);
  app.route('/product/product_history_list').post(productController.product_history_list);
  app.route('/product/product_history_list_by_name').post(productController.product_history_list_by_name);

  
  app.route('/product/productDetail').post(productFilter.requireProduct, productController.productDetail);
};