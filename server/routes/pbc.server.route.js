/**
 * Created by zenghong on 2017/8/8.
 */

var pbcController = require('../controllers/pbc');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/pbc/page_pbc_success').get(userFilter.requireUser, pbcController.page_pbc_success);
  app.route('/pbc/page_pbc_failed').get(userFilter.requireUser, pbcController.page_pbc_failed);
  app.route('/pbc/page_pbc_callback').get(userFilter.requireUser, pbcController.page_pbc_callback);
  app.route('/pbc/page_pbc_url').get(userFilter.requireUser, pbcController.page_pbc_url);
};