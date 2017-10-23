/**
 * Created by zenghong on 2017/8/8.
 */

var userController = require('../controllers/user');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/user/signup').post(userController.signup);
  app.route('/user/signin').post(userController.signin);
};