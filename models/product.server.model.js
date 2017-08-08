/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var ProductSchema = new Schema({
    object: {
      type: String,
      default: 'Product'
    },
    name: {
      type: String,
      require: true,
      index: true
    },
    log: {
      type: String,
      require: true
    },
    description: {
      type: String
    },
    //最小额度
    min_limit: {
      type: Number,
      require: true,
      default: 0
    },
    max_limit: {
      type: Number,
      require: true,
      default: 0
    },
    refer_cost_per_day: {
      type: Number,
      default: 0
    },
    //最长下款时间
    longest_time: {
      type: Number,
      default: 0
    },
    //申请成功率
    apply_success_percent: {
      type: Number,
      default: 0
    },
    //申请人数
    apply_people_count: {
      type: Number,
      default: 0
    },
    //费用说明相关
    fee_info: {
      type: Schema.Types.Mixed
    },
    //申请说明相关
    apply_info: {
      type: Schema.Types.Mixed
    },
    //其他说明相关
    other_info: {
      type: Schema.Types.Mixed
    },
    deleted_status: {
      type: Boolean,
      default: false
    },
    //申请策略
    apply_strategy: {
      type: Schema.Types.Mixed
    },
    //机构信息
    organization_info: {
      type: Schema.Types.Mixed
    }
  });


  ProductSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('Product', ProductSchema);
};
