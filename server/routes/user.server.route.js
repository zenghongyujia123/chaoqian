/**
 * Created by zenghong on 2017/8/8.
 */

var userController = require('../controllers/user');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/user/signup').post(userController.signup);
  app.route('/user/signin').post(userController.signin);
  app.route('/user/userList').post(userController.userList);
  app.route('/user/getUserById').post(userFilter.requireUserById, userController.getUserById);
  app.route('/user/updateUserAuth1').post(userFilter.requireUser, userController.updateUserAuth1);
  app.route('/user/updateUserAuth2').post(userFilter.requireUser, userController.updateUserAuth2);
};