/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var ArticleSchema = new Schema({
    object: {
      type: String,
      default: 'Article'
    },
    title: {
      type: String,
      require: true,
      index: true
    },
    image: {
      type: String,
      require: true
    },
    content: {
      type: String,
    },
    description: {
      type: String
    },
    tag_string: {
      type: String
    },
    tag_array: {
      type: []
    },
    read_count: {
      type: Number,
      default: 0
    },
    //下款率
    str1: {
      type: String,
      default: ''
    },
    //最快下款
    str2: {
      type: String,
      default: ''
    },
    //产品标签（英文逗号分隔）
    str3: {
      type: String,
      default: ''
    },
    str3s: {
      type: []
    },
    //
    str4: {
      type: String,
      default: ''
    },
    //
    str5: {
      type: String,
      default: ''
    },
    //
    str6: {
      type: String,
      default: ''
    },
    str6s: {
      type: []
    },
    //
    str7: {
      type: String,
      default: ''
    },
    str7s: {
      type: []
    },
    //
    str8: {
      type: String,
      default: ''
    },
    str8s: {
      type: []
    },
    //
    str9: {
      type: String,
      default: ''
    },
    //
    str10: {
      type: String,
      default: ''
    },
    //
    str11: {
      type: String,
      default: ''
    },
    //
    str12: {
      type: String,
      default: ''
    },
    //
    str13: {
      type: Number,
      default: 0
    },
    //
    str14: {
      type: Number,
      default: 0
    },
    //
    str15: {
      type: Number,
      default: 0
    },
    //
    str16: {
      type: Number,
      default: 0
    },
    //
    str17: {
      type: Number,
      default: 0
    },
    //
    str18: {
      type: Number,
      default: 0
    }
  });

  ArticleSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Article', ArticleSchema);
};
