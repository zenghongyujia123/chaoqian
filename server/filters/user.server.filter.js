'use strict';

var cookieLib = require('../../libraries/cookie');
var userLogic = require('../logics/user');

exports.requireUser = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  console.log('cookie:', cookie);

  userLogic.requireByUserId(cookie.user_id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/page_wechat/signin')
    }

    if (cookie.openid) {
      user.openid = cookie.openid;
      user.save(function (err, savedUser) {
        if (err) {
          return next(err);
        }
        req.user = savedUser;
        return next();
      });
    }
    else {
      req.user = user;
      return next();
    }
  })
};


exports.requireUserById = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  userLogic.requireByUserId(req.body.user_id || req.query.user_id || req.params.user_id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/page_wechat/signin')
    }

    if (cookie.openid) {
      user.openid = cookie.openid;
      user.save(function (err, savedUser) {
        if (err) {
          return next(err);
        }
        req.requireUserById = savedUser;
        return next();
      });
    }
    else {
      req.requireUserById = user;
      return next();
    }
  })
};