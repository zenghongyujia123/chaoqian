/**
 * Created by zenghong on 2017/8/8.
 */

var cardController = require('../controllers/card');
var cardFilter = require('../filters/card');

module.exports = function (app) {
  app.route('/card/updateCard').post(cardController.updateCard);
  app.route('/card/cardList').post(cardController.cardList);
  app.route('/card/cardDetail').post(cardFilter.requireCard, cardController.cardDetail);
};