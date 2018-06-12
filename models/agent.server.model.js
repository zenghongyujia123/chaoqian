/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  cryptoLib = require('../libraries/crypto');

module.exports = function (appDb) {
  var AgentSchema = new Schema({
    object: {
      type: String,
      default: 'Agent'
    },
    type: {
      type: String,
      enum: ['qq_agent'],
      default: 'qq_agent'
    },
    //名字
    str1: {
      type: String
    },
    //描述
    str2: {
      type: String
    },
    //tip
    str3: {
      type: String
    },
    //url
    str4: {
      type: String
    },
    //
    str5: {
      type: String
    },
    //
    str6: {
      type: String
    },
    //
    str7: {
      type: String
    },
    //
    str8: {
      type: String
    },
    //
    str9: {
      type: String
    },
    //
    str10: {
      type: String
    },
    //
    str11: {
      type: String
    },
    //
    str12: {
      type: String
    },
    deleted_status: {
      type: Boolean,
      default: false
    }
  });


  var AgentHistorySchema = new Schema({
    object: {
      type: String,
      default: 'AgentHistory'
    },
    type: {
      type: String,
      enum: ['qq_agent'],
      default: 'qq_agent'
    },
    user:{
      ref:'User',
      type: Schema.Types.ObjectId,
    },
    agent:{
      ref:'Agent',
      type: Schema.Types.ObjectId,
    },
    //名字
    str1: {
      type: String
    },
    //描述
    str2: {
      type: String
    },
    //tip
    str3: {
      type: String
    },
    //url
    str4: {
      type: String
    },
    //
    str5: {
      type: String
    },
    //
    str6: {
      type: String
    },
    deleted_status: {
      type: Boolean,
      default: false
    }
  });

  AgentHistorySchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  AgentSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  appDb.model('Agent', AgentSchema);
  appDb.model('AgentHistory', AgentHistorySchema);
};
