/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  cryptoLib = require('../libraries/crypto');

module.exports = function (appDb) {
  var UserNewSchema = new Schema({
    object: {
      type: String,
      default: 'UserNew'
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    //
    str1: {
      type: String,
      trim: true
    },
    //
    str2: {
      type: String,
      trim: true
    },
    //
    str3: {
      type: String,
      trim: true
    },
    //
    str4: {
      type: String,
      trim: true
    },
    //
    str5: {
      type: String,
      trim: true
    },
    //
    str6: {
      type: String,
      trim: true
    },
    //
    str7: {
      type: String,
      trim: true
    },
    //
    str8: {
      type: String,
      trim: true
    },
    //
    str9: {
      type: String,
      trim: true
    },
    //
    str10: {
      type: String,
      trim: true
    },
    //
    str11: {
      type: String,
      trim: true
    },
    //
    str12: {
      type: String,
      trim: true
    },
    str13: {
      type: String,
      trim: true
    },
    obj1: {
      type: Schema.Types.Mixed,
      default: {}
    },
    obj2: {
      type: Schema.Types.Mixed,
      default: {}
    },
    obj3: {
      type: Schema.Types.Mixed,
      default: {}
    },
    obj4: {
      type: Schema.Types.Mixed,
      default: {}
    },
  });

  UserNewSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
      return cryptoLib.toMd5(password);
    } else {
      return password;
    }
  };

  UserNewSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
  };

  UserNewSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  appDb.model('UserNew', UserNewSchema);
};
