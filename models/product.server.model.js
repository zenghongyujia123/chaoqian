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
    logo: {
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
    //参考开销每天
    refer_cost_per_day: {
      type: Number,
      default: 0
    },
    fee_cost_per_day: {
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
    },
    //跳转连接
    organization_url: {
      type: String,
      default: ''
    },
    wechat_detail_info: {
      type: String,
      default: ''
    },
    risk_codes: {
      type: String,
      default: ''
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
    //金额
    str4: {
      type: String,
      default: ''
    },
    //期限
    str5: {
      type: String,
      default: ''
    },
    //所需材料（英文逗号分隔）
    str6: {
      type: String,
      default: ''
    },
    str6s: {
      type: []
    },
    //申请条件（英文逗号分隔）
    str7: {
      type: String,
      default: ''
    },
    str7s: {
      type: []
    },
    //费用说明（月费率）
    str8: {
      type: String,
      default: ''
    },
    str8s: {
      type: []
    },
    //费用说明（说明）
    str9: {
      type: String,
      default: ''
    },
    //还款方式
    str10: {
      type: String,
      default: ''
    },
    //提前还款
    str11: {
      type: String,
      default: ''
    },
    //逾期政策
    str12: {
      type: String,
      default: ''
    }
  });


  ProductSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Product', ProductSchema);
};
