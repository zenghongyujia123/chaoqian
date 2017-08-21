/**
 * Created by zenghong on 2017/8/8.
 */

var productFilterController = require('../controllers/product_filter');

module.exports = function (app) {
  app.route('/product_filter/updateFilter').post(productFilterController.updateFilter);
  app.route('/product_filter/getFilter').post(productFilterController.getFilter);

  
};