'use strict';

var cardLogic = require('./../logics/card');
var cardErr = require('./../errors/card');

exports.requireCard = function (req, res, next) {
  var card_id = req.body.card_id || req.query.card_id || '';
  if (!card_id) {
    return next(cardErr.card_id_empty);
  }

  cardLogic.cardDetail(card_id, function (err, result) {
    if (err) {
      return next(err);
    }

    if (!result) {
      return next(cardErr.card_not_exist);
    }

    req.card = result;
    return next();
  });
};