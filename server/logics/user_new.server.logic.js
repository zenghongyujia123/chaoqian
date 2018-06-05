/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var smsLib = require('./../../libraries/sms');
var appDb = mongoose.appDb;
var UserNew = appDb.model('UserNew');
var UserPay = appDb.model('UserPay');
var postcodeLogic = require('../logics/postcode');
var thirdQueryCtr = require('../controllers/third_query');

var sysErr = require('./../errors/system');
var agent = require('superagent').agent();

var that = exports;

exports.signup = function (infoinfo, callback) {
  UserNew.findOne({ username: info.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (user) {
      return callback({ err: { type: 'username_exist', zh_message: '该用户已存在' } });
    }

    user = new UserNew({
      username: info.username,
      parent: info.code || '',
      // vincent : check the topparent in signup step , and save in db
      top_parent: info.top_parent || ''
    });
    user.str1 = info.str1;
    user.str2 = info.str2;
    user.str3 = info.str3;
    user.str4 = info.str4;
    user.str5 = info.str5;
    user.str6 = info.str6;
    user.str7 = info.str7;
    user.password = user.hashPassword(info.password);
    user.save(function (err, saveUser) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, { success: true, user_id: saveUser._id });
    });
  });
}

exports.signin = function (info, callback) {
  UserNew.findOne({ username: info.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!user) {
      return callback({ err: { type: 'user_not_exist', zh_message: '用户不存在' } });
    }

    if (user.password !== user.hashPassword(info.password)) {
      return callback({ err: { type: 'user_not_valid', zh_message: '用户名或密码错误' } });
    }

    return callback(null, { success: true, user_id: user._id });
  });
};
