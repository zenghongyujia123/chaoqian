/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var userLogic = require('../logics/user');
var creditPeopleLogic = require('../logics/credit_people');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
var cryptoLib = require('../../libraries/crypto');
var agent = require('superagent').agent();
var moment = require('moment');
var access_token = '';


var xml2js = require('xml2js');
var parseString = xml2js.parseString;
function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}
function getPrePayId(req, openid, user_id, callback) {
  // console.log('test  pay tEST ===============>');

  var jsonInfo = {
    xml: {
      appid: 'wxf567e44e19240ae3',
      mch_id: '1447454002',
      device_info: 'web',
      nonce_str: new Date().getTime().toString(),
      sign_type: 'MD5',
      body: '潮钱充值中心-测试会员充值',
      out_trade_no: new Date().getTime().toString(),
      fee_type: 'CNY',
      detail: user_id,
      total_fee: 1,
      openid: openid,
      spbill_create_ip: getClientIp(req),
      notify_url: 'http://chaoqianwang.com/page_wechat/notify_url',
      trade_type: 'JSAPI',
    }
  };

  var signArray = [];
  for (var prop in jsonInfo.xml) {
    signArray.push(prop + '=' + jsonInfo.xml[prop]);
  }
  signArray = signArray.sort();
  signArray.push('key=' + 'kskjlskejki23456789kkksdjj22jjjj');
  console.log(signArray.join('&'));
  jsonInfo.xml.sign = cryptoLib.toMd5(signArray.join('&')).toUpperCase();

  var builder = new xml2js.Builder();
  var xml = builder.buildObject(jsonInfo);

  console.log(xml);


  agent.post('https://api.mch.weixin.qq.com/pay/unifiedorder')
    .set('Content-Type', 'application/xml')
    .send(xml)
    .end(function (err, res) {
      console.log('res.err =================================================================>');
      console.log(err);
      console.log('res.body =================================================================>');
      console.log(res.text);

      parseString(res.text, { explicitArray: false, ignoreAttrs: true }, function (err, data) {
        return callback(null, data.xml);
      });
    });
  // // var json = parser.toJson(xml);
  // console.log("to json -> %s", json);
};

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


function getAccessToken(callback) {
  agent.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf567e44e19240ae3&secret=fe0fad0d4eb9cedec995dbea06bd2f3b')
    .end(function (err, result) {
      console.log('err-----');
      console.log(err);
      console.log('result-----');
      console.log(result.text);

      access_token = result.text.access_token;
      console.log('access_token : ', access_token);
      callback();
    });
}

exports.getPrePayId = function (req, res, next) {
  var user = req.user;
  getPrePayId(req, user.openid, user._id.toString(), function (err, result) {
    if (err) {
      return next(err);
    }

    req.data = result;
    return next();
  });
}

exports.getPayPage = function (req, res, next) {
  var prepay_id = req.params.prepay_id || req.query.prepay_id;

  console.log('prepay_id', prepay_id);

  var info = {
    appId: 'wxf567e44e19240ae3',
    timeStamp: new Date().getTime().toString(),
    nonceStr: new Date().getTime().toString(),
    package: 'prepay_id=' + prepay_id,
    signType: 'MD5',
  }

  var signArray = [];
  for (var prop in info) {
    signArray.push(prop + '=' + info[prop]);
  }
  signArray = signArray.sort();
  signArray.push('key=' + 'kskjlskejki23456789kkksdjj22jjjj');
  info.paySign = cryptoLib.toMd5(signArray.join('&')).toUpperCase();


  var filepath = path.join(__dirname, '../../web/c_wechat/views/pay_test.client.view.html');
  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  return res.render(filepath, { city: req.cookies.city, info: info });
}