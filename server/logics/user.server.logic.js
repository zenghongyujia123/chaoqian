/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var User = appDb.model('User');
var sysErr = require('./../errors/system');

var that = exports;

exports.signup = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.username) {
    return callback({ err: { type: 'password_empty', zh_message: '用户名不能为空' } });
  }

  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (user) {
      return callback({ err: { type: 'username_exist', zh_message: '该用户已存在' } });
    }

    user = new User({
      username: userInfo.username,
      openid: userInfo.openid
    });
    user.password = user.hashPassword(userInfo.password);
    user.save(function (err, saveUser) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, { success: true, user_id: saveUser._id });
    });
  });
}

exports.signin = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.username) {
    return callback({ err: { type: 'password_empty', zh_message: '用户名不能为空' } });
  }
  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!user) {
      return callback({ err: { type: 'user_not_exist', zh_message: '用户不存在' } });
    }

    if (user.password !== user.hashPassword(userInfo.password)) {
      return callback({ err: { type: 'user_not_valid', zh_message: '用户名或密码错误' } });
    }

    return callback(null, { success: true, user_id: user._id });
  });
};

exports.requireByUserId = function (userid, callback) {
  User.findOne({ _id: userid }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, user);
  });
}

exports.saveCarrierToken = function (user, token, callback) {
  user.carrier_token = token;
  user.carrier_token_time = new Date();
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.saveCarrierDetail = function (user, detail, callback) {
  user.carrier_detail = detail;
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.savePbcToken = function (user, token, callback) {
  user.pbc_token = token;
  user.pbc_token_time = new Date();
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.savePbcDetail = function (user, detail, callback) {
  user.pbc_detail = detail;
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.updateVipNotice = function (user, callback) {
  user.has_read_vip_notice = true;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}


exports.updateUserAuth1 = function (user, real_name, real_phone, id_card, callback) {
  user.real_name = real_name;
  user.real_phone = real_phone;
  user.id_card = id_card;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}
