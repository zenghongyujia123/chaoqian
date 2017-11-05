/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var UserSchema = new Schema({
    object: {
      type: String,
      default: 'User'
    },
    username: {
      type: String,
      trim: true
    },
    real_name: {
      type: String,
      trim: true
    },
    real_phone: {
      type: String,
      trim: true
    },
    id_card: {
      type: String,
      trim: true
    },
    openid: {
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
    },
    carrier_detail: {
      type: Schema.Types.Mixed
    },
    carrier_token: {
      type: String,
      default: ''
    },
    carrier_token_time: {
      type: Date,
    },
    pbc_detail: {
      type: Schema.Types.Mixed
    },
    pbc_token: {
      type: String,
      default: ''
    },
    pbc_token_time: {
      type: Date,
    },
    has_read_vip_notice: {
      type: Boolean,
      default: false
    },
    vip_payed: {
      type: Boolean,
      default: false
    },
    vip_payed_time: {
      type: Date
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

  var UserPaySchema = new Schema({
    object: {
      type: String,
      default: 'UserPay'
    },
    type: {
      type: String,
      enum: ['vip_pay']
    },
    content: {
      type: Schema.Types.Mixed
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
  var UserPay = appDb.model('UserPay', UserPaySchema);
};
