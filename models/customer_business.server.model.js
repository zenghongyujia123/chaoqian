/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var CustomerBusinessSchema = new Schema({
    object: {
      type: String,
      default: 'Customerbusiness'
    },
    record_date: {
      type: Date,
    },
    target_user: {
      type: String,
     },
    target_user_real_name: {
        type: String,
       }, 
    target_user_agent_rate: {
      type: String,
      default: '一般代理'
    },
    target_user_vip_rate: {
      type: String,
      default:''
    },
    loan_num: {
      type: Number,
      default:0
    },
    credit_num: {
        type: Number,
        default:0
    },
    pos_num: {
        type: Number,
        default:0
    },
    money4agent: {
        type: Number,
        default:0
    },
    money4Sagent: {
        type: Number,
        default:0
    },
    car_mgr_num: {
        type: Number,
        default:0
    },
    help4credit: {
        type: Number,
        default:0
    },
    help4card: {
        type: Number,
        default:0
    },
    parent_name: {
        type: String,
      },
    parent_phone: {
        type: String,
       },
    parent_create_date: {
        type: Date,
      },
    parent_loan_award: {
        type: Number,
        default:0
      },
    parent_credit_award: {
          type: Number,
          default:0
      },
      parent_pos_award: {
          type: Number,
          default:0
      },
      parent_vip_award: {
        type: Number,
        default:0
    },      
      parent_money4agent_award: {
          type: Number,
          default:0
      },
      parent_money4Sagent_award: {
          type: Number,
          default:0
      },
      parent_car_mgr_award: {
          type: Number,
          default:0
      },
      parent_help4credit_award: {
          type: Number,
          default:0
      },
      parent_help4card_award: {
          type: Number,
          default:0
      },    
      topparent_name: {
        type: String,
      },
    topparent_phone: {
        type: String,
       },
       topparent_create_date: {
        type: Date,
      },
      topparent_loan_award: {
        type: Number,
        default:0
      },
      topparent_credit_award: {
          type: Number,
          default:0
      },
      topparent_pos_award: {
          type: Number,
          default:0
      },
      topparent_vip_award: {
        type: Number,
        default:0
    },        
      topparent_money4agent_award: {
          type: Number,
          default:0
      },
      topparent_money4Sagent_award: {
          type: Number,
          default:0
      },
      topparent_car_mgr_award: {
          type: Number,
          default:0
      },
      topparent_help4credit_award: {
          type: Number,
          default:0
      },
      topparent_help4card_award: {
          type: Number,
          default:0
      }
  });


  CustomerBusinessSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
appDb.model('Record', CustomerBusinessSchema);
};
