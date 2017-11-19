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
    //新手办卡
    int1: {
      type: Number,
      default: 0
    },
    //高额取现
    int2: {
      type: Number,
      default: 0
    },
    //网购精选
    int3: {
      type: Number,
      default: 0
    },
    //商务旅游
    int4: {
      type: Number,
      default: 0
    },
    //成功申请人数
    int5: {
      type: Number,
      default: 0
    },
    //标签：如（一元停车,买车优惠）
    str1: {
      type: String,
      default: ''
    },
    str1s: {
      type: [],
      default: []
    },
    str2: {
      type: String,
      default: ''
    },
    str2s: {
      type: [],
      default: []
    },
  });

  var User = appDb.model('Card', CardSchema);
};
