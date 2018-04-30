/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var agent = require('superagent').agent();
var async = require('async');

exports.signup = function (req, res, next) {
  var userinfo = req.body.user_info;
  userinfo.openid = req.cookies.openid;
  userLogic.signup(userinfo, function (err, result) {
    if (err) {
      return next(err);
    }

    cookieLib.setCookie(res, 'user_id', result.user_id.toString());
    req.data = result;
    return next();
  });
};
exports.signin = function (req, res, next) {
  userLogic.signin(req.body.user_info, function (err, result) {
    if (err) {
      return next(err);
    }

    cookieLib.setCookie(res, 'user_id', result.user_id.toString());
    req.data = result;
    return next();
  });
};
exports.updateUserAuth1 = function (req, res, next) {
  var user = req.user;
  var real_name = req.body.real_name;
  var real_bank_number = req.body.real_bank_number;
  var real_phone = req.body.real_phone;
  var id_card = req.body.id_card;
  userLogic.updateUserAuth1(user, real_name, real_phone, id_card,real_bank_number, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.updateUserAuth2 = function (req, res, next) {
  userLogic.updateUserAuth2(req.user, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.userList = function (req, res, next) {
  userLogic.userList(function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}
// add condition and query the database,  
exports.userListByCondition = function (req, res, next) {
  userLogic.userListByCondition(req.body.condition, req.body.sort, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

/**********************************/
//requireByUsername= function (username, callback)
exports.getUserByUsername = function (req, res, next) {
  userLogic.requireByUsername(req.body.username, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

/**********************************/


exports.getUserById = function (req, res, next) {
  var user = req.requireUserById;
  user = JSON.parse(JSON.stringify(user));

  async.auto({
    getCarrierDetail: function (callback) {
      if (!user.carrier_token) {
        return callback();
      }
      if (user.carrier_detail) {
        return callback();
      }

      get_carrier_detail(user.carrier_token, function (err, detail) {
        if (err) {
          return callback(err);
        }
        if (detail.errorCode) {
          return callback();
        }
        detail = JSON.stringify(detail);
        userLogic.saveCarrierDetail(user, detail, function (err, result) {
          if (err) {
            return callback(err);
          }
          user.carrier_detail = detail;
          return callback();
        })
      });
    },
    getPbcDetail: function (callback, result) {
      if (!user.pbc_token) {
        return callback();
      }

      if (user.pbc_detail) {
        return callback();
      }


      get_pbc_detail(user.pbc_token, function (err, detail) {
        if (err) {
          return callback(err);
        }
        if (detail.errorCode) {
          return callback();
        }
        detail = JSON.stringify(detail);
        userLogic.savePbcDetail(user, detail, function (err, result) {
          if (err) {
            return callback(err);
          }
          user.pbc_detail = detail;
          return callback();
        })
      });
    }
  }, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = user;
    return next();
  });
}

exports.rollback_vip_infos = function (req, res, next) {
  userLogic.rollback_vip_infos(req.requireUserById, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.verifyVip = function (req, res, next) {

  userLogic.verifyVip(req.requireUserById, function (err, result) {
    if (err) {
      return next(err);
    }
    smsLib.sendVipPassedSuccess(req.requireUserById.username, function () { });
    req.data = result;
    return next();
  });
}

exports.updateVipInfo = function (req, res, next) {
  userLogic.updateVipInfo(req.requireUserById, req.body.vip_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}
//updateAgentRate
exports.updateAgentRate = function (req, res, next) {
  userLogic.updateAgentRate(req.requireUserById, req.body.vip_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}
exports.updateAddInfo = function (req, res, next) {
  userLogic.updateAddInfo(req.requireUserById, req.body.user_info, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.update_vip_status = function (req, res, next) {
  if(req.body.status==='refuse'){
    smsLib.juJueVip(req.requireUserById.username, function () { });
  }

  userLogic.update_vip_status(req.requireUserById, req.body.status, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}


exports.updateVipReportInfo = function (req, res, next) {
  userLogic.updateVipReportInfo(req.requireUserById, req.body.vip_report, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}

exports.updateUserLocation = function (req, res, next) {
  userLogic.updateUserLocation(req.user, req.body.lng, req.body.lat, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}







function get_carrier_detail(token, callback) {
  agent.get('http://e.apix.cn/apixanalysis/mobile/retrieve/phone/data/analyzed?query_code=' + token)
    .set('apix-key', '92fd3f3bf03a40087fe4ece5bba355cf')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(err, result);
    });
}

function get_pbc_detail(token, callback) {
  agent.get('http://e.apix.cn/apixanalysis/pbccrc/retrieve/credit/data/query?query_code=' + token)
    .set('apix-key', 'd3bb7276d4364ee97cdb808ef6b043a8')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .end(function (err, result) {
      result = JSON.parse(result.text);
      return callback(err, result);
    });
}
