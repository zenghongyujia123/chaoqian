/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Postcode = appDb.model('Postcode');
var sysErr = require('./../errors/system');

var that = exports;


exports.create_postcode = function (user, number, callback) {
  new Postcode({ number: number }).save(function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
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



