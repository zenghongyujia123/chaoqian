/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
exports.index = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/home.client.view.html');
  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);

  return res.render(filepath, { city: req.cookies.city });
};

exports.product_list = function (req, res, next) {
  productFilterloigc.getFilter(function (err, filters) {
    if (err) {
      return next(next);
    }
    var filepath = path.join(__dirname, '../../web/c_platform/views/product_list.client.view.html');
    console.log(filters);
    return res.render(filepath, { city: req.cookies.city || '', filters: filters });
  });
};

exports.city_select = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/city_select.client.view.html');
  console.log(provinces);
  return res.render(filepath, { city: req.cookies.city || '', provinces: provinces.provinces });
};

exports.product_detail = function (req, res, next) {
  productLogic.productDetail(req.params.product_id, function (err, product) {
    var filepath = path.join(__dirname, '../../web/c_platform/views/product_detail.client.view.html');
    return res.render(filepath, { city: req.cookies.city || '', product: product });
  });
};

exports.backend_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/backend_signin.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};