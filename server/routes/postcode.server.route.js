/**
 * Created by zenghong on 2017/8/8.
 */

var psotcodeController = require('../controllers/postcode');

module.exports = function (app) {
  app.route('/psotcode/create_postcode').post(psotcodeController.create_postcode);
  app.route('/psotcode/list').post(psotcodeController.list);
};