/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Card = appDb.model('Card');
var sysErr = require('./../errors/system');

var that = exports;

exports.updateCard = function (cardInfo, callback) {

  if (!cardInfo._id) {
    cardInfo._id = mongoose.generateNewObjectId();
  }

  that.cardDetail(cardInfo._id, function (err, card) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!card) {
      card = new Card({});
    }

    card.name = cardInfo.name;
    card.logo = cardInfo.logo;
    card.description = cardInfo.description;
    card.organization_url = cardInfo.organization_url;
    card.save(function (err, savedCard) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, savedCard);
    });
  })

};

exports.cardList = function (callback) {
  Card.find({}, function (err, cards) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, cards);
  });
};

exports.cardListByIds = function (ids, callback) {
  ids = ids || [];
  Card.find({ _id: { $in: ids } }, function (err, cards) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, cards);
  });
};

exports.cardDetail = function (cardId, callback) {
  Card.findOne({ _id: cardId }, function (err, card) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, card);
  });
};

// exports.productsByRiskCode = function (codes, callback) {
//   codes = codes || [];
//   Card.find({ risk_codes: { $in: codes } }).limit(8).exec(function (err, products) {
//     if (err) {
//       return callback({ err: sysErr.database_query_error });
//     }
//     return callback(null, products)
//   })
// }