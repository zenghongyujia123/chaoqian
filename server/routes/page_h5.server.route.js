/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_h5');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/page_h5/page_signin').get(index.page_signin);
  app.route('/page_h5/page_signup').get(index.page_signup);
  app.route('/page_h5/page_list_qq').get(userFilter.requireUser, index.page_list_qq);
  app.route('/page_h5/third_page').get(index.third_page);

};