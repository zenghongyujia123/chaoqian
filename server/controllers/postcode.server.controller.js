/**
 * Created by zenghong on 2017/8/8.
 */
var postCodeLogic = require('./../logics/postcode');

exports.create_postcode = function (req, res, next) {
  postCodeLogic.create_postcode(req.user, req.body.number, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.list = function (req, res, next) {
  postCodeLogic.list(req.user, req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};