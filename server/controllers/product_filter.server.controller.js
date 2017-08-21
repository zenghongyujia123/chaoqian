/**
 * Created by zenghong on 2017/8/8.
 */
var productFilterLogic = require('./../logics/product_filter');

exports.updateFilter = function (req, res, next) {
  productFilterLogic.updateFilter(req.body.filter_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.getFilter = function (req, res, next) {
  productFilterLogic.getFilter( function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};


