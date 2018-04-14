/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var ThirdQuery = appDb.model('ThirdQuery');
var sysErr = require('./../errors/system');

var that = exports;

exports.insert_query_result = function (user, query_name, info, callback) {
  new ThirdQuery({
    query_name: query_name || '',
    result: info || {},
    user: user._id
  }).save(function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
};

exports.get_query_by_list = function (user, info, callback) {
  var query = {};
  if (info.user) {
    query.user = user._id;
  }
  ThirdQuery.find(query, function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
}


