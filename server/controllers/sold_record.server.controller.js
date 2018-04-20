/**
 * Created by Vincent on 2018/1/6.
 */
var soldRecord = require('./../logics/sold_record');



exports.soldRecordList = function (req, res, next) {
  var condition = {};
  var sort = { '_id': 1 };
  soldRecord.soldRecordListByCondition(condition, sort, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.vip69SoldList = function (req, res, next) {

  var condition = { 'type': 'vip_pay' };
  var sort = { 'content.time_end': 1 };
  soldRecord.soldRecordListByCondition(condition, sort, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.credit198SoldList = function (req, res, next) {

  var condition = { 'type': 'credit198_pay' };
  var sort = { 'content.time_end': 1 };
  soldRecord.soldRecordListByCondition(condition, sort, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

// add condition and query the database,  
exports.soldRecordListByCondition = function (req, res, next) {
  soldRecord.soldRecordListByCondition(req.body.condition, req.body.sort, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

/**


//soldRecordListByCondition
soldRecord.soldRecordListByCondition(condition,sort,req.body, function (err, result) {
  if (err) {
    return next(err);
  }
  req.data = result;
  return next();
});
 */

exports.recordDetail = function (req, res, next) {
  req.data = req.record;
  return next();
};


exports.update_sold_record = function (req, res, next) {
  soldRecord.update_sold_record(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();

  })
};

exports.get_by_id = function (req, res, next) {
  soldRecord.get_by_id(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  })
};