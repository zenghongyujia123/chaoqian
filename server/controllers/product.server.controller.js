/**
 * Created by zenghong on 2017/8/8.
 */
var productLogic = require('./../logics/product');

exports.updateProduct = function (req, res, next) {
  productLogic.getProductShareUrl(req.body.product_info, function (err, url_info) {
    req.body.product_info.shart_url_short = url_info[0].url_short;
    productLogic.updateProduct(req.body.product_info, function (err, result) {
      if (err) {
        return next(err);
      }
      req.data = result;
      return next();
    });
  });
};

exports.productList = function (req, res, next) {
  productLogic.productList({}, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.productDetail = function (req, res, next) {
  req.data = req.product;
  return next();
};

exports.product_history_list = function (req, res, next) {
  productLogic.product_history_list(function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};