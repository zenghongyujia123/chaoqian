/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('./../logics/product');
var cookieLib = require('../../libraries/cookie');

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

exports.page_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_h5/views/page_signin.html');
  return res.render(filepath, {});
}
exports.page_signup = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_h5/views/page_signup.html');
  return res.render(filepath, {});
}

exports.page_list_qq = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_h5/views/page_list_qq.html');
  return res.render(filepath, {});
}

exports.third_page = function (req, res, next) {
  var url = req.query.url;
  productLogic.update_product_history(req.cookies.user_id, req.query.name, getClientIp(req), function () {

  });
  return res.redirect(url);
}
