/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user');
var cookieLib = require('../../libraries/cookie');

exports.signup = function (req, res, next) {
  userLogic.signup(req.body.user_info, function (err, result) {
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
