/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var PostcodeSchema = new Schema({
    object: {
      type: String,
      default: 'Postcode'
    },
    user:{
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    number: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['un_used', 'used'],
      default: 'un_used'
    },
    bind_time:{
      type:Date,
    }
  });

  PostcodeSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  appDb.model('Postcode', PostcodeSchema);
};
