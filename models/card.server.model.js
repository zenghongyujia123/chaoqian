/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var CardSchema = new Schema({
    object: {
      type: String,
      default: 'Card'
    },
    logo: {
      type: String
    },
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    //跳转连接
    organization_url: {
      type: String,
      default: ''
    },
    int1: {
      type: Number,
      default: 0
    },
    int2: {
      type: Number,
      default: 0
    },
    int3: {
      type: Number,
      default: 0
    },
    int4: {
      type: Number,
      default: 0
    }
  });

  var User = appDb.model('Card', CardSchema);
};
