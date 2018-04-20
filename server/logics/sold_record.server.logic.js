/**
 * Created by Vincent on 2018/1/20
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var SoldRecord = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;


exports.soldRecordListByCondition = function (condition, sort, callback) {
  SoldRecord.find(condition, function (err, sold_records) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, sold_records);
  });//.sort(sort);
}

exports.get_by_id = function (info, callback) {
  SoldRecord.findOne({ _id: info.detail_id }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  });
}
exports.update_sold_record = function (info, callback) {
  if (!info.detail_id) {
    return callback();
  }

  var setObj = { $set: {} };
  setObj.$set = { admin_descript_1: info.admin_descript_1 };

  SoldRecord.update({ _id: info.detail_id }, setObj, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  })
}
