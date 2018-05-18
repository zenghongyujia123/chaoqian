'use strict';

var crypto = require('crypto');
var fs = require('fs');
var moment = require('moment');
var agent = require('superagent').agent();
var privateKey = fs.readFileSync('../keys/lianlian/rsa_private_key.pem').toString();
var publicKey = fs.readFileSync('../keys/lianlian/llpay_public_key.pem').toString();
// var privateKey = fs.readFileSync('../keys/lianlian/private_key.txt').toString();
// var privateKey = fs.readFileSync('../keys/lianlian/private_key.txt').toString();
// var priKey = new NodeRSA(privateKey, 'pkcs8-private');


function lianlianSign(sortParams) {
  var sign = crypto.createSign('md5WithRSAEncryption').update(sortParams);
  return encodeURIComponent(sign.sign(privateKey, 'base64'));
}

function lianlianVerify(sign) {
  return crypto.createVerify('md5WithRSAEncryption').verify(publicKey, sign, 'hex');
}

exports.lianlianVerify = function (sign) {
  var result =  lianlianVerify(sign);
  console.log(result);
  return result;
}

exports.get_lianlian_pay_data = function (user, info, callback) {

  var user_info_dt_register = moment(new Date(1526192370760)).format('YYYYMMDDHHMMSS');
  var url = 'https://wap.lianlianpay.com/payment.htm';
  var data = {
    version: '1.0',
    oid_partner: '201805110001835179',
    // platform: '201805110001835179',
    user_id: user._id.toString(),
    app_request: '3',
    sign_type: 'RSA',
    busi_partner: '101001',
    no_order: new Date().getTime().toString(),
    dt_order: moment(new Date()).format('YYYYMMDDHHMMSS'),
    name_goods: info.pay_title,
    info_order: info.pay_type,
    money_order: '0.01',
    notify_url: 'http://www.chaoqianwang.com/lianlian_pay/notify_url',
    url_return: 'http://www.chaoqianwang.com/lianlian_pay/url_return',
  };

  var datas = [];
  for (var prop in data) {
    datas.push([prop, data[prop]].join('='));
  }


  datas = datas.sort().join('&');

  // datas += '&key=201408071000001546_test_20140815'

  // var sign = md5(datas);
  var sign = lianlianSign(datas);
  data.sign = sign;
  console.log(data);
  return callback(JSON.stringify(data))
}


