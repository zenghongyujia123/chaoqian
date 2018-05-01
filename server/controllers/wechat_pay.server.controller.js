/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var userLogic = require('../logics/user');
var wechatNewloigc = require('../logics/wechat_new');

var creditPeopleLogic = require('../logics/credit_people');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
var cryptoLib = require('../../libraries/crypto');
var agent = require('superagent').agent();
var moment = require('moment');

var xml2js = require('xml2js');
var parseString = xml2js.parseString;
function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

exports.notify_url = function (req, res, next) {
  console.log(' notify_url = {------------>');
  console.log(req.body);
  var info = {
    appid: req.body.xml.appid[0],
    bank_type: req.body.xml.bank_type[0],
    cash_fee: req.body.xml.cash_fee[0],
    device_info: req.body.xml.device_info[0],
    fee_type: req.body.xml.fee_type[0],
    is_subscribe: req.body.xml.is_subscribe[0],
    mch_id: req.body.xml.mch_id[0],
    nonce_str: req.body.xml.nonce_str[0],
    attach: req.body.xml.attach[0],
    openid: req.body.xml.openid[0],
    out_trade_no: req.body.xml.out_trade_no[0],
    result_code: req.body.xml.result_code[0],
    return_code: req.body.xml.return_code[0],
    sign: req.body.xml.sign[0],
    time_end: req.body.xml.time_end[0],
    total_fee: req.body.xml.total_fee[0],
    trade_type: req.body.xml.trade_type[0],
    transaction_id: req.body.xml.transaction_id[0]
  }
  if (info && info.result_code == 'SUCCESS') {
    userLogic.updateVipPayedByOpenid(req.body.xml.openid[0], info, function () {
    });
  }

  var json = {
    xml: {
      return_code: 'SUCCESS',
      return_msg: 'OK'
    }
  }
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(json);

  return res.send(xml);
}

exports.token_verify = function (req, res, next) {
  console.log(req.body);
  return res.send(req.query.echostr);
}
exports.getUserJsApiTicket = function (req, res, next) {
  wechatNewloigc.getUserJsApiTicket(req.body.url, function (err, result) {
    return res.send(result);
  });
}


exports.get_pre_pay_id = function (req, res, next) {
  var user = req.user;
  var price, product;
  var detail = {
    pay_price: '',
    pay_title: '',
    pay_type: '',
    user_id: user._id.toString()
  };

  if (req.body.pay_type === 'vip_pay') {
    detail.pay_price = 29900;
    detail.pay_title = '潮钱网充值中心-会员充值';
    detail.pay_type = 'vip_pay';
  }
  else if (req.body.pay_type === 'query_大数据') {
    detail.pay_price = 990;
    detail.pay_title = '潮钱网充值中心-网贷成功率查询';
    detail.pay_type = 'query_大数据';
  }
  else if (req.body.pay_type === 'query_黑中介') {
    detail.pay_price = 99;
    detail.pay_title = '潮钱网充值中心-网贷黑中介查询';
    detail.pay_type = 'query_黑中介';
  }
  else if (req.body.pay_type === 'query_黑灰行为') {
    detail.pay_price = 990;
    detail.pay_title = '潮钱网充值中心-网贷黑灰行为查询'
    detail.pay_type = 'query_黑灰行为';
  }
  else if (req.body.pay_type === 'postcode_pay') {
    detail.pay_price = 6900;
    detail.pay_title = '潮钱网充值中心-激活码'
    detail.pay_type = 'postcode_pay';
  }
  else if (req.body.pay_type === 'pos_suixingfu') {
    detail.pay_price = 12000;//12000
    detail.pay_title = '潮钱网充值中心-随行付刷卡机'
    detail.pay_type = 'pos_suixingfu';
  }
  else if (req.body.pay_type === 'pos_xinguodu') {
    detail.pay_price = 39900;//39900
    detail.pay_title = '潮钱网充值中心-新国都刷卡机'
    detail.pay_type = 'pos_xinguodu';
  }
  else {
    return res.send({ err: { type: 'invalid_pay_type', message: '支付类型无效，请联系管理员！' } });
  }

  wechatNewloigc.get_pre_pay_id(req, detail, user.openid, function (err, result) {
    if (err) {
      return res.send(err);
    }

    return res.send(result);
  });
}

exports.get_pre_pay_info = function (req, res, next) {
  return res.send(wechatNewloigc.get_pre_pay_info(req.body.prepay_id));
}

exports.vip_pay_notify_url = function (req, res, next) {
  wechatNewloigc.vip_pay_notify_url(req, function (result) {
    return res.send(result);
  });
}


