/**
 * Created by zenghong on 2017/8/8.
 */

var carrierController = require('../controllers/carrier');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/carrier/page_carrier_success').get(userFilter.requireUser, carrierController.page_carrier_success);
  app.route('/carrier/page_carrier_failed').get(userFilter.requireUser, carrierController.page_carrier_failed);
  app.route('/carrier/page_carrier_callback').get(userFilter.requireUser, carrierController.page_carrier_callback);
  app.route('/carrier/page_carrier_url').get(userFilter.requireUser, carrierController.page_carrier_url);
};