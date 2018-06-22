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
  var today = new Date(new Date().setHours(0, 0, 0, 0));
  var yestoday = new Date(today).setDate(today.getDate() - 1)
  var type = req.body.type || 'product';

  productLogic.product_history_list({ type: type }, function (err, total_result) {
    productLogic.product_history_list({ start_time: yestoday, end_time: today, type: type }, function (err, yestoday_result) {
      productLogic.product_history_list({ start_time: today, type: type }, function (err, today_result) {
        if (err) {
          return next(err);
        }
        req.data = { total_result: total_result, yestoday_result: yestoday_result, today_result: today_result };
        return next();
      });
    })
  });
};


exports.product_history_list_by_name = function (req, res, next) {
  productLogic.product_history_list_by_name(req.body.name, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};
