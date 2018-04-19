/**
 * Created by zenghong on 2017/8/8.
 */

var postcodeController = require('../controllers/postcode');

module.exports = function (app) {
  app.route('/postcode/create_postcode').post(postcodeController.create_postcode);
  app.route('/postcode/list').post(postcodeController.list);
};