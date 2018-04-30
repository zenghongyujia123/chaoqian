var _ = require('lodash');

var apikey = '1c18748ca1c51add4fcde413188c68b0';
var agent = require('superagent').agent();
var single_url = 'https://sms.yunpian.com/v2/sms/tpl_single_send.json';




function sendTplSingleSms(mobile, tpl_id, tpl_value, callback) {
  agent.post('https://sms.yunpian.com/v2/sms/tpl_single_send.json')
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .send({
      'apikey': '1c18748ca1c51add4fcde413188c68b0',
      'mobile': mobile,
      'tpl_id': tpl_id,
      'tpl_value': tpl_value,
    })
    .end(function (err, result) {
      console.log('sms----err', err);
      console.log('sms----result', result.text);
      return callback();
    });
}
//【潮钱网】亲爱的#name#，我们已经收到您的支付款项，您可以点击获得开户码功能进入查看您的二维码（长按保存，截图都可以）。
exports.sendPostCodePaySuccess = function (mobile, callback) {
  sendTplSingleSms(mobile, '2265338', '#name#=客户', callback)
}

exports.sendPostMachinePaySuccess = function (mobile, callback) {
  sendTplSingleSms(mobile, '2266276', '#name#=客户', callback)
}

exports.sendVipPassedSuccess = function (mobile, callback) {
  sendTplSingleSms(mobile, '2268458', '#name#=客户', callback)
}

exports.sendWoYaoJieKuan = function (mobile, callback) {
  sendTplSingleSms(mobile, '2268538', '#name#=客户', callback)
}

exports.juJueVip = function (mobile, callback) {
  sendTplSingleSms(mobile, '2268458', '#name#=客户', callback)
}





