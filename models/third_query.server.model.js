/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var ThirdQuerySchema = new Schema({
    object: {
      type: String,
      default: 'ThirdQuery'
    },
    query_name: {
      type: String
    },
    result: {
      type: Schema.Types.Mixed
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  });
  appDb.model('ThirdQuery', ThirdQuerySchema);
};
