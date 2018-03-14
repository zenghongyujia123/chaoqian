/**
 * Created by Vincent on 2018/1/6.
 */
var customerBusinessLogic = require('./../logics/customer_business');

exports.updateRecord = function (req, res, next) {
  customerBusinessLogic.updateRecord(req.body.record_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.recordList = function (req, res, next) {
  /*
    var query_sort = {
      query_key : req.body,
      sort_key : '1'
    };
*/

    customerBusinessLogic.recordList(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.recordDetail = function (req, res, next) {
  req.data = req.record;
  return next();
};