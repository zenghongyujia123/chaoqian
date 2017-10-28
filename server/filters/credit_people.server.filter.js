'use strict';

var creditPeopleLogic = require('./../logics/credit_people');
var creditPeopleErr = require('./../errors/product');

exports.requireCreditPeople = function (req, res, next) {
  var credit_people_id = req.body.credit_people_id || req.query.credit_people_id || '';
  if (!credit_people_id) {
    return next(creditPeopleErr.credit_people_id_is_empty);
  }

  creditPeopleLogic.creditPeopleDetail(credit_people_id, function (err, result) {
    if (err) {
      return next(err);
    }

    if (!result) {
      return next(creditPeopleErr.credit_people_not_exist);
    }

    req.credit_people = result;
    return next();
  });
};