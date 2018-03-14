/**
 * Created by Vincent on 2018/1/6
 */

var recordController = require('../controllers/customer_business');
var recordFilter = require('../filters/customer_business');

module.exports = function (app) {
  app.route('/customer_business/updateRecord').post(recordController.updateRecord);
  app.route('/customer_business/recordList').post(recordController.recordList);
  app.route('/customer_business/recordDetail').post(recordFilter.requireRecord,recordController.recordDetail);
};