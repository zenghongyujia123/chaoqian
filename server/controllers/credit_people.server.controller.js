/**
 * Created by zenghong on 2017/8/8.
 */
var creditPeopleLogic = require('./../logics/credit_people');

exports.updateCreditPeople = function (req, res, next) {
  creditPeopleLogic.updateCreditPeople(req.body.credit_people_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.creditPeopleList = function (req, res, next) {
  creditPeopleLogic.creditPeopleList(function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.creditPeopleDetail = function (req, res, next) {
  req.data = req.credit_people;
  return next();
};

exports.nearCreditPeopleList = function (req, res, next) {
  creditPeopleLogic.nearCreditPeopleList(req.body.location, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

