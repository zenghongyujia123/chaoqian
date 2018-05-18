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

exports.new_sold_record = function (user, pay_type, callback) {
  new SoldRecord({
    user_id: user._id,
    type: pay_type,
    user_real_name: user.wechat_info.nickname,
    user_phone: user.username
  }).save(function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(err, result);
  });
}

exports.update_by_lianlianpay = function (info, callback) {
  SoldRecord.findOne({ _id: info.no_order }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    result.content = info;
    result.markModified('content')
    result.content.total_fee = parseFloat(info.money_order) * 100;
    result.save();
    return callback(err,result);
  })
}
