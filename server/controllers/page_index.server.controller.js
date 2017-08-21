/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');

exports.index = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/home.client.view.html');
  return res.render(filepath,{});
};


exports.product_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/product_list.client.view.html');
  return res.render(filepath, { });
};

exports.city_select  = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/city_select.client.view.html');
  return res.render(filepath, { });
};

exports.product_detail = function (req, res, next) {
  productLogic.productDetail(req.params.product_id, function (err, product) {
    var filepath = path.join(__dirname, '../../web/c_platform/views/product_detail.client.view.html');
    return res.render(filepath, { product: product });
  });
};

exports.backend_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/backend_signin.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};