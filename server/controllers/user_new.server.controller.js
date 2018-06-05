/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user_new');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var agent = require('superagent').agent();
var async = require('async');

exports.signup = function (req, res, next) {
  var userinfo = req.body.user_info;
  userinfo.openid = req.cookies.openid;
  userLogic.signup(userinfo, function (err, result) {
    if (err) {
      return next(err);
    }

    cookieLib.setCookie(res, 'user_id', result.user_id.toString());
    req.data = result;
    return next();
  });
};
exports.signin = function (req, res, next) {
  userLogic.signin(req.body.user_info, function (err, result) {
    if (err) {
      return next(err);
    }

    cookieLib.setCookie(res, 'user_id', result.user_id.toString());
    req.data = result;
    return next();
  });
};
