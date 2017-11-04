/**
 * Created by zenghong on 2017/8/8.
 */

var carrierController = require('../controllers/carrier');

module.exports = function (app) {
  app.route('/carrier/page_success').get(carrierController.page_carrier_success);
  app.route('/carrier/page_carrier_failed').get(carrierController.page_carrier_failed);
  app.route('/carrier/page_carrier_callback').get(carrierController.page_carrier_callback);
  app.route('/carrier/page_carrier_url').get(carrierController.page_carrier_url);
};