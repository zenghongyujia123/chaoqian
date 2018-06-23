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
      return res.redirect('/page/partner_signin');
    }

    req.user = user;

    return next();
  })
};