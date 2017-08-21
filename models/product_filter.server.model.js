/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var ProductFilterSchema = new Schema({
    object: {
      type: String,
      default: 'ProductFilter'
    },
    //智能排序
    brain_sort: [],
    //贷款额度
    loan_limit: [],
    //职业身份
    working_identity: [],
    //个人资质
    personal_natural: [],
    //办理周期
    cycle_time: [],
    //智能排序
    loan_term:[]
  });


  ProductFilterSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('ProductFilter', ProductFilterSchema);
};
