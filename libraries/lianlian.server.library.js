'use strict';

var crypto = require('crypto');
var fs = require('fs');
var moment = require('moment');
var agent = require('superagent').agent();
var privateKey = fs.readFileSync('../keys/lianlian/rsa_private_key.pem').toString();

function lianlianSign(sortParams) {
  var sign = crypto.createSign('RSA-SHA1').update(new Buffer( sortParams),'utf8').sign(privateKey, 'base64');
  console.log(sign);
  return sign;
}

function md5(str) {
  var decipher = crypto.createHash('md5').update(str).digest('hex');
  return decipher;
}
exports.get_lianlian_pay_data = function (callback) {

  var user_info_dt_register = moment(new Date(1526192370760)).format('YYYYMMDDHHMMSS');
  var url = 'https://wap.lianlianpay.com/payment.htm';
  var data = {
    version: '1.0',
    oid_partner: '201805110001835179',
    platform: '201805110001835179',
    user_id: '13472423583',
    app_request: '3',
    sign_type: 'RSA',
    busi_partner: '101001',
    no_order: new Date().getTime().toString(),
    dt_order: moment(new Date()).format('YYYYMMDDHHMMSS'),
    name_goods: '测试商品',
    info_order: '测试描述',
    money_order: '0.01',
    notify_url: 'http://chaoqianwang.com',
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
  // return callback(JSON.stringify(data))
  agent.get(url)
    .query({ req_data: JSON.stringify(data) })
    .end(function (err, result) {
      console.log(err);
      console.log(result.text);
      // callback(result.text);
    });
}

exports.get_lianlian_pay_data();


