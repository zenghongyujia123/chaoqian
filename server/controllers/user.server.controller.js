/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user');
var cookieLib = require('../../libraries/cookie');

exports.signup = function (req, res, next) {
  var userinfo = req.body.user_info;
  userinfo.openid = req.cookies.openid;
  userLogic.signup(user_info, function (err, result) {
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
exports.updateUserAuth1 = function (req, res, next) {
  var user = req.user;
  var real_name = req.body.real_name;
  var real_phone = req.body.real_phone;
  var id_card = req.body.id_card;
  userLogic.updateUserAuth1(user, real_name, real_phone, id_card, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.updateUserAuth2 = function (req, res, next) {
  userLogic.updateUserAuth2(req.user, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}