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
var that = exports;

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

exports.getAccessToken = function (callback) {
  agent.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf567e44e19240ae3&secret=fe0fad0d4eb9cedec995dbea06bd2f3b')
    .end(function (err, result) {
      console.log('err-----');
      console.log(err);
      console.log('result-----');
      console.log(result.text);

      access_token = JSON.parse(result.text).access_token;
      console.log('access_token : ', access_token);
      callback(err, access_token);
    });
}

exports.getUserJsApiTicket = function (callback) {
  that.getAccessToken(function (err, token) {
    agent.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi')
      .end(function (err, result) {
        var ticket = JSON.parse(result.text).ticket;
        console.log('getUserJsApiTicket', ticket);

        var noncestr = new Date().getTime().toString();
        var timestamp = new Date().getTime();

        var str = [
          'jsapi_ticket=' + ticket,
          'noncestr=' + noncestr,
          'timestamp=' + timestamp,
          'url=http://chaoqianwang.com/page_wechat/self_home'
        ];
        str = str.sort().join('&');
        console.log(str);
        var signature = cryptoLib.toSHA1(str);

        if (callback)
          callback(err, {
            ticket: ticket,
            noncestr: noncestr,
            timestamp: timestamp,
            signature: signature,
            appid: 'wxf567e44e19240ae3'
          });
      });
  })
}


