/**
 * Created by zenghong on 2017/8/8.
 */

var carrierController = require('../controllers/carrier');

module.exports = function (app) {
  app.route('/carrier/carrier_success_callback').get(carrierController.carrier_success_callback);
  app.route('/carrier/carrier_failed_callback').get(carrierController.carrier_failed_callback);
  app.route('/carrier/carrier_callback').get(carrierController.carrier_callback);
  app.route('/carrier/get_carrier_url').get(carrierController.get_carrier_url);
};