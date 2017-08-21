'use strict';

var cookieLib = require('../../libraries/cookie');

exports.requireProduct = function (req, res, next) {
  req.cookie = cookieLib.getCookie(req);
  return next();
};