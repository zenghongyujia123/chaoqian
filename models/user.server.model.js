/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  cryptoLib = require('../libraries/crypto');
var moment = require('moment');

module.exports = function (appDb) {
  var UserSchema = new Schema({
    object: {
      type: String,
      default: 'User'
    },
    parent: {
      type: String,
      trim: true
    },
    top_parent: {
      type: String,
      trim: true
    },
    create_time_day: {
      type: String
    },
    first_child_count: {
      type: Number,
      default: 0
    },
    second_child_count: {
      type: Number,
      default: 0
    },
    point: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      trim: true
    },
    real_name: {
      type: String,
      trim: true
    },
    real_bank_number: {
      type: String,
      trim: true
    },
    real_phone: {
      type: String,
      trim: true
    },
    id_card: {
      type: String,
      trim: true
    },
    id_front: {
      type: String,
    },
    id_back: {
      type: String,
    },
    id_man: {
      type: String,
    },
    openid: {
      type: String,
      trim: true
    },
    wechat_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    wy_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    eb_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    yys_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    //task_id,
    taobao_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    jingdong_info: {
      type: Schema.Types.Mixed,
      default: {}
    },
    password: {
      type: String,
      default: ''
    },
    nickname: {
      type: String
    },
    sex: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    country: {
      type: String
    },
    description: {//描述
      type: String
    },
    head_photo: {
      type: String
    },
    payment_id: {//支付需要的唯一标识 也是关注该公众号的用户的openid，并非是用户登录的openid，他们的unionid是相同的
      type: String
    },
    device_registration_id: {//jpush听众的唯一注册号id，用于push定向通知  可变
      type: String
    },
    salt: {
      type: String,
      default: 'secret'
    },
    deleted_status: {
      type: Boolean,
      default: false
    },
    carrier_detail: {
      type: Schema.Types.Mixed
    },
    carrier_token: {
      type: String,
      default: ''
    },
    carrier_token_time: {
      type: Date,
    },
    pbc_detail: {
      type: Schema.Types.Mixed
    },
    pbc_token: {
      type: String,
      default: ''
    },
    pbc_token_time: {
      type: Date,
    },
    has_read_vip_notice: {
      type: Boolean,
      default: false
    },
    has_read_invite_notice: {
      type: Boolean,
      default: false
    },
    agent_rate: {
      type: String,
      default: '非代理'
    },
    agent_rate_info: {
      type: String,
      default: '零成本加入代理商，开启创业赚钱新世界，点击了解'
    },
    credit198_payed: {
      type: Boolean,
      default: false
    },
    credit198_payed_time: {
      type: Date
    },
    postcode_payed: {
      type: Boolean,
      default: false
    },
    postcode_payed_time: {
      type: Date
    },
    vip_payed: {
      type: Boolean,
      default: false
    },
    vip_payed_time: {
      type: Date
    },
    vip_2_payed: {
      type: Boolean,
      default: false
    },
    vip_2_payed_time: {
      type: Date
    },
    vip_status: {
      type: String,
      enum: ['un_submit', 'submit', 'passed', 'daikuan', 'giveup', 'refuse'],
      default: 'un_submit'
    },
    vip_refund: {
      type: Boolean,
      default: false
    },
    vip_refuse_time: {
      type: Date
    },
    vip_status_submit_time: {
      type: Date
    },
    vip_product_ids: {
      type: []
    },
    vip_card_ids: {
      type: []
    },
    //vip_推荐信用初值
    vip_credit_starter: {
      type: String,
      default: ''
    },
    //vip_推荐信用估值
    vip_credit_assessment: {
      type: String,
      default: ''
    },
    //vip跳转连接文本
    vip_report_url_text: {
      type: String,
      default: ''
    },
    //vip产品推荐文本
    vip_product_assessment_text: {
      type: String,
      default: ''
    },
    vip_report: {
      type: Schema.Types.Mixed
    },
    alipay_id: {
      type: String,
    },
    email: {
      type: String,
    },
    adress: {
      type: String,
    },
    location: {
      type: [Number],
      index: '2dsphere'
    },
    remark1: {
      type: String,
      default: ''
    },
    remark2: {
      type: String,
      default: ''
    },
    remark3: {
      type: String,
      default: ''
    },
    //信用评估
    str1: {
      type: String
    },
    //信用额度
    str2: {
      type: String
    },
    //授信周期
    str3: {
      type: String
    },
    //授信利率
    str4: {
      type: String
    },
    //返现额度
    str5: {
      type: String
    },
    //资金方
    str6: {
      type: String
    },
    //还款额度
    str7: {
      type: String
    },
    //还款日
    str8: {
      type: String
    },
    //实际放款时间
    str9: {
      type: String
    },
    //实际还款时间
    str10: {
      type: String
    },
    //返现退款时间
    str11: {
      type: String
    },
    //vip授信颜色
    str12: {
      type: String
    },
    str13: {
      type: String
    },
  });

  UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
      return cryptoLib.toMd5(password);
    } else {
      return password;
    }
  };

  UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
  };

  var UserPaySchema = new Schema({
    object: {
      type: String,
      default: 'UserPay'
    },
    type: {
      type: String,
      enum: ['vip_pay','vip_2_pay', 'postcode_pay', 'pos_suixingfu', 'pos_xinguodu', 'credit198_pay', 'query_大数据', 'query_黑灰行为', 'query_黑中介']
    },
    user_id: {
      type: String,
    },
    user_parent: {
      type: String
    },
    parent_reward_payed_time: {
      type: Date
    },
    parent_reward_payed: {
      type: Boolean,
      default: false
    },
    parent_reward: {
      type: Number
    },
    top_parent_reward_payed_time: {
      type: Date
    },
    top_parent_reward_payed: {
      type: Boolean,
      default: false
    },
    top_parent_reward: {
      type: Number
    },
    user_top_parent: {
      type: String
    },
    user_real_name: {
      type: String,
    },
    user_bank_number: {
      type: String,
    },
    user_phone: {
      type: String,
    },
    admin_descript_1: {
      type: String,
      default: ''
    },
    valid: {
      type: Boolean,
      default: false
    },
    execute_params: {
      type: Schema.Types.Mixed
    },
    content: {
      type: Schema.Types.Mixed
    },

    type_text: {
      type: String
    }
  });

  UserPaySchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  function getParentRewardInfo(type) {
    var result = {};
    switch (type) {
      case 'vip_pay':
        result.parent_reward = 40;
        result.top_parent_reward = 10;
        result.type_text = 'vip充值';
        break;
      case 'postcode_pay':
        result.type_text = '信用代还';
        result.top_parent_reward = 30;
        result.parent_reward = 10;
        break;
      case 'pos_xinguodu':
        result.type_text = '新国东pos机';
        result.parent_reward = 80;
        result.top_parent_reward = 10;
        break;
      case 'pos_suixingfu':
        result.type_text = '随性付pos机';
        result.parent_reward = 0;
        result.top_parent_reward = 0;
        break;
      case 'query_大数据':
        result.type_text = '大数据查询';
        result.parent_reward = 4;
        result.top_parent_reward = 2;
        break;
      case 'query_黑灰行为':
        result.type_text = '黑灰行为查询';
        result.parent_reward = 4;
        result.top_parent_reward = 2;
        break;
      case 'query_黑中介':
        result.type_text = '黑中介查询';
        result.parent_reward = 0;
        result.top_parent_reward = 0;
        break;
    }
    return result;
  }

  UserPaySchema.pre('save', function (next) {
    if (this.type) {
      var result = getParentRewardInfo(this.type);
      this.parent_reward = result.parent_reward;
      this.top_parent_reward = result.top_parent_reward;
      this.type_text = result.type_text;
    }

    if (!this.create_time) {
      this.create_time = new Date();
    }
    this.create_time_day = moment(this.create_time).format('YYYY-MM-DD');
    next();
  });



  UserSchema.pre('save', function (next) {
    if (!this.create_time) {
      this.create_time = new Date();
    }
    if (!this.create_time_day) {
      this.create_time_day = moment(this.create_time).format('YYYY-MM-DD');
    }
    next();
  });

  var UserVipReportSchema = new Schema({
    object: {
      type: String,
      default: 'UserVipReport'
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
  var UserPay = appDb.model('UserPay', UserPaySchema);
};
