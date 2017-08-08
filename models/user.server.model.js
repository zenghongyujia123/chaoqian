/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  console.log('=---=-==')
  var UserSchema = new Schema({
    object: {
      type: String,
      default: 'User'
    },
    username: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      default: ''
    },
    nickname: {
      type: String
    },
    sex: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    country: {
      type: String
    },

    description: {//描述
      type: String
    },
    head_photo: {
      type: String
    },
    payment_id: {//支付需要的唯一标识 也是关注该公众号的用户的openid，并非是用户登录的openid，他们的unionid是相同的
      type: String
    },
    device_registration_id: {//jpush听众的唯一注册号id，用于push定向通知  可变
      type: String
    },
    salt: {
      type: String,
      default: 'secret'
    },
    deleted_status: {
      type: Boolean,
      default: false
    }
  });

  UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
      return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
      return password;
    }
  };

  UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
  };

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
};
