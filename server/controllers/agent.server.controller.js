/**
 * Created by zenghong on 2017/8/8.
 */
var agentLogic = require('./../logics/agent');

exports.update_agent = function (req, res, next) {
  agentLogic.update_agent(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.list_agent = function (req, res, next) {
  agentLogic.list_agent(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.detail_agent = function (req, res, next) {
  req.data = req.agent;
  return next();
};

