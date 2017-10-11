/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
exports.home = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  return res.render(filepath, { city: req.cookies.city });
};

exports.result = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/result.client.view.html');
  return res.render(filepath, { city: req.cookies.city || '' });
};

exports.product_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/product_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.question = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/question.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};