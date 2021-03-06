/**
 * Created by zenghong on 2017/8/8.
 */

var userController = require('../controllers/user');
var newUserController = require('../controllers/user_new');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/user/signup').post(userController.signup);
  app.route('/user/signin').post(userController.signin);

  app.route('/user_new/signin').post(newUserController.signin);
  app.route('/user_new/signup').post(newUserController.signup);

  app.route('/user/userList').post(userController.userList);
  app.route('/user/userListByCondition').post(userController.userListByCondition);
  app.route('/user/getUserByUsername').post(userController.getUserByUsername);
  // getUserByUsername
  app.route('/user/getUserById').post(userFilter.requireUserById, userController.getUserById);
  app.route('/user/updateUserAuth1').post(userFilter.requireUser, userController.updateUserAuth1);
  app.route('/user/updateUserAuth2').post(userFilter.requireUser, userController.updateUserAuth2);
  app.route('/user/updateUserLocation').post(userFilter.requireUser, userController.updateUserLocation);
  app.route('/user/verifyVip').post(userFilter.requireUserById, userController.verifyVip);
  app.route('/user/updateVipInfo').post(userFilter.requireUserById, userController.updateVipInfo);
  app.route('/user/updateAddInfo').post(userFilter.requireUserById, userController.updateAddInfo);
  ///user/updateAgentRate
  app.route('/user/updateAgentRate').post(userFilter.requireUserById, userController.updateAgentRate);
  app.route('/user/updateVipReportInfo').post(userFilter.requireUserById, userController.updateVipReportInfo);
  app.route('/user/update_vip_status').post(userFilter.requireUserById, userController.update_vip_status);
  app.route('/user/rollback_vip_infos').post(userFilter.requireUserById, userController.rollback_vip_infos);
  app.route('/user/parent_rewards').post(userFilter.requireUser, userController.parent_rewards);
  app.route('/user/parent_rewards_by_user_id').post(userFilter.requireUserById, userController.parent_rewards);
  app.route('/user/parent_rewards_by_user_parent').post(userController.parent_rewards_by_user_parent);
  app.route('/user/update_parent_rewards_status').post(userController.update_parent_rewards_status);
};