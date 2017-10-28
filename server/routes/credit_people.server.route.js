/**
 * Created by zenghong on 2017/8/8.
 */

var creditPeopleController = require('../controllers/credit_people');
var creditPeopleFilter = require('../filters/credit_people');

module.exports = function (app) {
  app.route('/credit_people/updateCreditPeople').post(creditPeopleController.updateCreditPeople);
  app.route('/credit_people/creditPeopleList').post(creditPeopleController.creditPeopleList);
  app.route('/credit_people/creditPeopleDetail').post(creditPeopleFilter.requireCreditPeople, creditPeopleController.creditPeopleDetail);
};