/**
 * Created by Vincent on 2018/1/20
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var SoldRecord = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;


exports.soldRecordListByCondition = function (condition,sort,callback) {
  SoldRecord.find(condition, function (err, sold_records) {
      if (err) {
        return callback({ err: sysErr.database_query_error });
      }
      return callback(null, sold_records);
    });//.sort(sort);
  }
  