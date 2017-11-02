/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var creditPeopleLogic = require('../logics/credit_people');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
var cryptoLib = require('../../libraries/crypto');
var agent = requie('superagent').agent();
var moment = require('moment');
exports.pay_test = function (req, res, next) {


  sendPaytest(req, function (err, result) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/pay_test.client.view.html');
    req.cookies.city = req.params.city || req.cookies.city || '';
    cookieLib.setCookie(res, 'city', req.cookies.city);
    return res.render(filepath, { city: req.cookies.city });
  });
};

var xml2js = require('xml2js');

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}
function sendPaytest(req, callback) {
  // console.log('test  pay tEST ===============>');

  var sk = '7daa4babae15ae17eee90c9e';

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
      total_fee: 1,
      spbill_create_ip: getClientIp(req),
      time_start: moment().format('yyyyMMddHHmmss'),
      notify_url: 'http://chaoqianwang.com/page_wechat/notify_url',
      trade_type: 'JSAPI',
    }
  };

  var signArray = [];
  for (var prop in jsonInfo.xml) {
    signArray.push(prop + '=' + jsonInfo.xml[prop]);
  }
  signArray = signArray.sort();
  signArray.push('key=' + 'fe0fad0d4eb9cedec995dbea06bd2f3b');
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
      callback(err, res);
    });


  // // var json = parser.toJson(xml);
  // console.log("to json -> %s", json);
};

exports.notify_url = function (req, res, next) {
  console.log(' notify_url = {------------>');
  console.log(req.body);
  return res.send('ok');
}