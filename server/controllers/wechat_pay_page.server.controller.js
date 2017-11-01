/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var creditPeopleLogic = require('../logics/credit_people');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
exports.home = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  return res.render(filepath, { city: req.cookies.city });
};

exports.credit_people_detail = function (req, res, next) {
  var credit_people = req.credit_people;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/credit_people_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city, credit_people: credit_people });
};