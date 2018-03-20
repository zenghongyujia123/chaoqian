/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var JieTiaoSchema = new Schema({
    object: {
      type: String,
      default: 'JieTiao'
    },
    name: {
      type: String,
      require: true,
      index: true
    },
    logo: {
      type: String,
      require: true
    },
    str1: {
      type: String,
      require: true
    },
    str1s: {
      type: [],
      require: true
    },
    str2: {
      type: String,
      require: true
    },
    str2s: {
      type: [],
      require: true
    },
    require: {
      type: String,
      require: true
    },
    description: {
      type: String
    }
  });


  JieTiaoSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('JieTiao', JieTiaoSchema);
};
