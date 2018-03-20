'use strict';

var jietiaoLogic = require('./../logics/jietiao');
var productErr = require('./../errors/product');

exports.requireJietiao = function (req, res, next) {
  var jietiao_id = req.body.jietiao_id || req.query.producjietiao_idt_id || '';
  if (!jietiao_id) {
    return next(productErr.jietiao_id_empty);
  }

  jietiaoLogic.jietiaoDetail(jietiao_id, function (err, result) {
    if (err) {
      return next(err);
    }

    if (!result) {
      return next(productErr.jietiao_not_exist);
    }

    req.jietiao = result;
    return next();
  });
};