/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var smsLib = require('./../../libraries/sms');
var appDb = mongoose.appDb;
var User = appDb.model('User');
var UserPay = appDb.model('UserPay');
var postcodeLogic = require('../logics/postcode');
var thirdQueryCtr = require('../controllers/third_query');
var async = require('async');

var sysErr = require('./../errors/system');
var agent = require('superagent').agent();

var that = exports;

exports.signup = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.password) {
    return callback({ err: { type: 'password_empty', zh_message: '用户密码不能为空' } });
  }

  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (user) {
      return callback({ err: { type: 'username_exist', zh_message: '该用户已存在' } });
    }

    user = new User({
      username: userInfo.username,
      openid: userInfo.openid,
      parent: userInfo.code || '',
      // vincent : check the topparent in signup step , and save in db
      top_parent: userInfo.top_parent || ''
    });
    user.password = user.hashPassword(userInfo.password);
    user.save(function (err, saveUser) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }

      if (saveUser.parent) {
        that.getParent(saveUser.parent, function (parentInfo) {
          if (parentInfo.top_parent) {
            saveUser.top_parent = parentInfo.top_parent.username;
          }

          saveUser.save(function () {
            that.updateChildsCount(parentInfo.parent, function () {
              that.updateChildsCount(parentInfo.top_parent, function () {
                return callback(null, { success: true, user_id: saveUser._id });
              });
            });
          });

        });
      }
      else {
        return callback(null, { success: true, user_id: saveUser._id });
      }
    });
  });
}

exports.updateChildsCount = function (user, callback) {
  if (!user) {
    return callback();
  }
  User.count({ parent: user.username }, function (err, count) {
    if (count) {
      user.first_child_count = count || 0;
    }
    User.count({ top_parent: user.username }, function (err, scount) {
      if (scount) {
        user.second_child_count = scount;
      }
      user.save(function () {
        return callback();
      });
    })
  });
}

exports.getParent = function (code, callback) {
  User.findOne({ username: code }, function (err, parent) {
    if (!parent) {
      return callback({});
    }

    if (parent.parent) {
      User.findOne({ username: parent.parent }, function (err, top_parent) {
        if (top_parent) {
          return callback({ parent: parent, top_parent: top_parent });
        }
        else {
          return callback({ parent: parent, top_parent: null });
        }

      })
    }
    else {
      return callback({ parent: parent, top_parent: null });
    }


  });
}

exports.signin = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.username) {
    return callback({ err: { type: 'password_empty', zh_message: '用户名不能为空' } });
  }
  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!user) {
      return callback({ err: { type: 'user_not_exist', zh_message: '用户不存在' } });
    }

    if (user.password !== user.hashPassword(userInfo.password)) {
      return callback({ err: { type: 'user_not_valid', zh_message: '用户名或密码错误' } });
    }

    return callback(null, { success: true, user_id: user._id });
  });
};

exports.updateUserWechatInfo = function (user, openid, wechat_info, callback) {
  if (user.openid === openid && user.wechat_info && user.wechat_info.openid) {
    console.log('updateUserWechatInfo  1');
    return callback(null, user);
  }

  User.findOne({ openid: openid }, function (err, oldUser) {
    if (err) {
      console.log('updateUserWechatInfo  2');

      return callback({ err: sysErr.database_query_error });
    }


    if (oldUser) {
      oldUser.openid = null;
      oldUser.wechat_info = {};
      oldUser.save(function () {
        user.openid = openid;
        user.wechat_info = wechat_info;
        user.save(function (err, savedUser) {
          console.log('updateUserWechatInfo  3');

          return callback(err, savedUser)
        })
      });
    }
    else {
      user.openid = openid;
      user.wechat_info = wechat_info;
      user.save(function (err, savedUser) {
        console.log('updateUserWechatInfo  4');

        return callback(err, savedUser)
      })
    }


  })
}

exports.requireByUserId = function (userid, callback) {
  if (!userid) {
    userid = mongoose.generateNewObjectId();
  }
  User.findOne({ _id: userid }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, user);
  });
}
/*******************************************************/
exports.requireByUsername = function (name1, callback) {
  User.findOne({ username: name1 }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, user);
  });
}


/********************************************************* */


exports.saveCarrierToken = function (user, token, callback) {
  user.carrier_token = token;
  user.carrier_token_time = new Date();
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.saveCarrierDetail = function (user, detail, callback) {
  User.findOne({ _id: user._id }, function (err, u) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    u.carrier_detail = detail;
    u.save(function (err, saveUser) {
      if (err) {
        console.log('err2');
        console.log(err);
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, saveUser);
    });
  })

}

exports.savePbcToken = function (user, token, callback) {
  user.pbc_token = token;
  user.pbc_token_time = new Date();
  user.save(function (err, saveUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, saveUser);
  });
}

exports.savePbcDetail = function (user, detail, callback) {
  User.findOne({ _id: user._id }, function (err, u) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    u.pbc_detail = detail;
    u.save(function (err, saveUser) {
      if (err) {
        console.log('err1');
        console.log(err);
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, saveUser);
    });
  });
}

exports.updateVipNotice = function (user, callback) {
  user.has_read_vip_notice = true;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.updateInviceNotice = function (user, callback) {
  user.has_read_invite_notice = true;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}


exports.updateUserAuth1 = function (user, real_name, real_phone, id_card, real_bank_number, callback) {
  user.real_name = real_name;
  user.real_phone = real_phone;
  user.id_card = id_card;
  user.real_bank_number = real_bank_number;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.updateVipPayedByOpenid = function (idInfo, info, callback) {
  var query = {};
  var userPayQuery;
  if (idInfo.openid) {
    query.openid = idInfo.openid;
    userPayQuery = { 'content.transaction_id': info.transaction_id };
  }

  if (idInfo.user_id) {
    query._id = idInfo.user_id;
    userPayQuery = { _id: info.no_order };
  }

  var pay_type = info.attach || info.info_order
  User.findOne(query, function (err, user) {
    if (!user) {
      return callback();
    }

    UserPay.findOne(userPayQuery, function (err, userPay) {
      var real_name = ((user.real_name != '') ? user.real_name : user.wechat_info.nickname);
      if (!userPay) {
        userPay = new UserPay({
          type: pay_type,
          user_id: user._id,
          user_parent: user.parent,
          user_top_parent: user.top_parent,
          user_phone: user.username,
          user_real_name: user.wechat_info.nickname,
          content: info,
          valid: true
        });
      }
      userPay.save(function () {
        console.log(pay_type);

        if (pay_type === 'vip_pay' || pay_type === 'vip_2_pay' || pay_type === 'postcode_pay') {
          user[pay_type + 'ed'] = true;
          user[pay_type + 'ed_time'] = new Date();

          if (pay_type === 'postcode_pay') {
            postcodeLogic.update_status(user, function (err, result) {
              console.log('postcode bind err----', err);
              console.log('postcode bind result----', result);
            });
            smsLib.sendPostCodePaySuccess(user.username, function () { });
          }
          else {
            thirdQueryCtr.execute_shumei_api(user);
          }
        }

        if (pay_type === 'pos_suixingfu' || pay_type === 'pos_xinguodu') {
          smsLib.sendPostMachinePaySuccess(user.username, function () { });
        }
        if (pay_type === 'pos_suixingfu' || pay_type === 'pos_xinguodu' || pay_type === 'vip_pay' || pay_type === 'vip_2_pay') {
          smsLib.sendPaySuccessInfo(user.username, pay_type, userPay.content.total_fee / 100, function () { });
        }


        user.save(function (err) {
          return callback();
        });
      })
    });


  });
}

exports.updateUserAuth2 = function (user, info, callback) {
  user.vip_status = 'submit';
  user.vip_status_submit_time = new Date();
  if (info.id_front) {
    user.id_front = info.id_front || '';
  }
  if (info.id_back) {
    user.id_back = info.id_back || '';
  }
  if (info.id_man) {
    user.id_man = info.id_man || '';
  }
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.updateUserLocation = function (user, lng, lat, callback) {
  if (lng > 0 && lat > 0) {
    user.location = [lng, lat];
  }
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.userList = function (callback) {
  User.find({}).sort({ create_time: -1 }).exec(function (err, users) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, users);
  })
}

//userListByCondition

exports.userListByCondition = function (condition, sort, callback) {
  User.find(condition, function (err, users) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, users);
  }).sort(sort);
}

exports.update_vip_status = function (user, status, callback) {
  user.vip_status = status;
  if (status === 'refuse') {
    user.vip_refuse_time = new Date();
  }
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.verifyVip = function (user, callback) {
  user.vip_status = 'passed';
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}
exports.rollback_vip_infos = function (user, callback) {
  user.vip_credit_assessment = '';
  user.vip_credit_starter = '';
  user.vip_report_url_text = '';
  user.vip_product_ids = [];
  user.vip_card_ids = [];
  user.str1 = '';
  user.str2 = '';
  user.str3 = '';
  user.str4 = '';
  user.str5 = '';
  user.str6 = '';
  user.str7 = '';
  user.str8 = '';
  user.str9 = '';
  user.str10 = '';
  user.str11 = '';
  user.str12 = '';
  user.str13 = '';
  user.remark1 = '';
  user.remark2 = '';
  user.remark3 = '';
  user.carrier_detail = '';
  user.carrier_token = '';
  user.carrier_token_time = null;

  user.pbc_detail = '';
  user.pbc_token = '';
  user.pbc_token_time = null;

  user.has_read_vip_notice = false;
  user.has_read_invite_notice = false;
  user.vip_payed = false;
  user.vip_2_payed = false;
  user.vip_2_payed_time = null;
  user.vip_payed_time = null;
  user.vip_status = 'un_submit';
  user.vip_refund = false;
  user.vip_status_submit_time = null;
  user.save(function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
}

exports.updateVipInfo = function (user, vip_info, callback) {
  user.vip_credit_assessment = vip_info.vip_credit_assessment;
  user.vip_credit_starter = vip_info.vip_credit_starter;
  user.vip_report_url_text = vip_info.vip_report_url_text;
  user.vip_product_ids = vip_info.vip_product_ids;
  user.vip_card_ids = vip_info.vip_card_ids || [];

  user.str1 = vip_info.str1;
  user.str2 = vip_info.str2;
  user.str3 = vip_info.str3;
  user.str4 = vip_info.str4;
  user.str5 = vip_info.str5;
  user.str6 = vip_info.str6;
  user.str7 = vip_info.str7;
  user.str8 = vip_info.str8;
  user.str9 = vip_info.str9;
  user.str10 = vip_info.str10;
  user.str11 = vip_info.str11;
  user.str12 = vip_info.str12;
  user.str13 = vip_info.str13;
  user.remark1 = vip_info.remark1;
  user.remark2 = vip_info.remark2;
  user.remark3 = vip_info.remark3;

  user.agent_rate = vip_info.agent_rate;
  user.agent_rate_info = vip_info.agent_rate_info;

  user.markModified('vip_product_ids');
  user.markModified('vip_card_ids');
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}


exports.updateAddInfo = function (user, vip_info, callback) {
  user.real_name = vip_info.real_name;
  user.alipay_id = vip_info.alipay_id;
  user.email = vip_info.email;
  user.adress = vip_info.adress;

  if (vip_info.real_bank_number) {
    user.real_bank_number = vip_info.real_bank_number;
  }

  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}
//updateAgentRate
exports.updateAgentRate = function (user, info, callback) {
  user.agent_rate = info.agent_rate;
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}


exports.updateVipReportInfo = function (user, vip_report, callback) {
  vip_report.str29s = (vip_report.str29 || '').split('|');
  user.vip_report = vip_report;
  user.markModified('vip_report');
  user.save(function (err, savedUser) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedUser);
  });
}

exports.getUserShareUrl = function (username, origin, callback) {
  agent.get('http://api.t.sina.com.cn/short_url/shorten.json?source=3271760578&url_long=http://' + origin + '/page_me_share/' + username)
    .end(function (err, data) {
      return callback(err, data.body);
    });
}

exports.refresh_task = function (user, callback) {

}

exports.user_pays = function (user, callback) {
  UserPay.find({ user_id: user._id, valid: true }, function (err, results) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  })
}

exports.parent_rewards = function (user, callback) {
  UserPay.find({ user_parent: user.username, valid: true }).sort({ create_time: -1 }).exec(function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  })
}


exports.parent_rewards_by_user_parent = function (info, callback) {
  var query = {
    valid: true
  };
  if (info.user_parent) {
    query.user_parent = info.user_parent;
  }

  if (info.user_top_parent) {
    query.user_top_parent = info.user_top_parent;
  }

  UserPay.find(query).sort({ create_time: -1 }).exec(function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  })
}

exports.update_parent_rewards_status = function (info, callback) {
  var set = {
  }

  if (info.parent_type === 'user_parent') {
    set = { $set: { parent_reward_payed: true, parent_reward_payed_time: new Date() } }
  }
  if (info.parent_type === 'user_top_parent') {
    set = { $set: { top_parent_reward_payed: true, top_parent_reward_payed_time: new Date() } }
  }

  UserPay.update({ _id: info.userpay_id }, set, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
}

exports.getParterDatas = function (partner, callback) {
  User.aggregate([
    {
      $match: {
        parent: partner
      }
    },
    {
      $group: {
        _id: '$create_time_day',
        create_time_day: { $first: '$create_time_day' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { create_time_day: -1 }
    }
  ]).exec(function (err, results) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, results);
  });
}

// function updateUserTime() {
//   User.find({ create_time_day: { $exists: false } }, function (err, users) {
//     async.eachSeries(users, function (user, eachCallback) {
//       user.save(function (err, savedUser) {
//         console.log('username : ', savedUser.username, 'create_time', savedUser.create_time, 'format', savedUser.create_time_day);
//         return eachCallback();
//       });
//     });
//   });
// }

