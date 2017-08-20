/**
 * Created by zenghong on 2017/8/8.
 */

var productController = require('../controllers/product');

module.exports = function (app) {
  app.route('/product/updateProduct').post(productController.updateProduct);
  app.route('/product/productList').post(productController.productList);
};