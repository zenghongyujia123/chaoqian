/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');

exports.index = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/home.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};


exports.product_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/product_list.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};

exports.product_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/product_detail.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};

exports.backend_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/backend_signin.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};