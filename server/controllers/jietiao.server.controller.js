/**
 * Created by zenghong on 2017/8/8.
 */
var jietiaoLogic = require('./../logics/jietiao');

exports.updateJietiao = function (req, res, next) {
  jietiaoLogic.getShareUrl(req.body.jietiao_info, function (err, url_info) {
    req.body.jietiao_info.shart_url_short = url_info[0].url_short;
    jietiaoLogic.updateJietiao(req.body.jietiao_info, function (err, result) {
      if (err) {
        return next(err);
      }
      req.data = result;
      return next();
    });
  });
};

exports.jietiaoList = function (req, res, next) {
  jietiaoLogic.jietiaoList({}, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.jietiaoDetail = function (req, res, next) {
  req.data = req.jietiao;
  return next();
};