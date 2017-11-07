/**
 * Created by zenghong on 2017/8/8.
 */
var cardLogic = require('./../logics/card');

exports.updateCard = function (req, res, next) {
  cardLogic.updateCard(req.body.card_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.cardList = function (req, res, next) {
  cardLogic.cardList(function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.cardDetail = function (req, res, next) {
  req.data = req.card;
  return next();
};