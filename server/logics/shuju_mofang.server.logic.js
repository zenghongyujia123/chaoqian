/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var User = appDb.model('User');
var sysErr = require('./../errors/system');

var that = exports;


exports.shuju_mofang_callback_update = function (user_id, type, info, callback) {
  var updateInfo = {};
  updateInfo[type] = info;
  User.update({ _id: user_id }, { $set: updateInfo },function(err,result){
    return callback();
  });
 
}
