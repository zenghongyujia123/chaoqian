/**
 * Created by zenghong on 2017/8/8.
 */

var agentController = require('../controllers/agent');
var agentFilter = require('../filters/agent');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/agent/update_agent').post(agentController.update_agent);
  app.route('/agent/list_agent').post(agentController.list_agent);
  app.route('/agent/detail_agent').post(agentFilter.requireAgent, agentController.detail_agent);
  app.route('/agent/update_history').post(userFilter.requireUser, agentFilter.requireAgent, agentController.update_history);
  app.route('/agent/list_history').post(agentFilter.requireAgent, agentController.list_history);

};