/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Postcode = appDb.model('Postcode');
var sysErr = require('./../errors/system');

var that = exports;


exports.create_postcode = function (user, number, callback) {
  Postcode.findOne({ number: number }, function (err, old) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (old) {
      return callback({ err: { type: 'code_exist', message: 'code已存在' } });
    }
    new Postcode({ number: number }).save(function (err, result) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, result);
    });
  });
}

exports.list = function (user, info, callback) {
  var query = {};
  if (info.user_id) {
    query.user = info.user_id;
  }
  Postcode.find(query, function (err, results) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}

exports.update_status = function (user, callback) {
  Postcode.findOne({ status: 'un_used' }, function (err, postcode) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    if (!postcode) {
      return callback(null, { err: { type: 'no_code', message: '没有code，请与管理员联系' } });
    }

    postcode.user = user._id;
    postcode.bind_time = new Date();
    postcode.save(function (err, result) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }/*  */
      return callback(null, result);
    });

  });
}



