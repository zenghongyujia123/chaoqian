'use strict';

var crypto = require('crypto');
var fs = require('fs');
var moment = require('moment');
var agent = require('superagent').agent();
var privateKey = fs.readFileSync('../keys/lianlian/rsa_private_key.pem').toString();

function lianlianSign(sortParams) {
  var sign = crypto.createSign('RSA-SHA1').update(sortParams).sign(privateKey, 'base64');
  console.log(sign);
  return encodeURIComponent(sign);
}

function md5(str,key){  
  var decipher = crypto.createHash('md5',key)  
  if(key){  
    return decipher.update(str).digest()  
  }  
  return decipher.update(str).digest('hex')  
}  
function lianlianPay(params) {

  var user_info_dt_register = moment(new Date(1526192370760)).format('YYYYMMDDHHMMSS');
  var url = 'https://wap.lianlianpay.com/payment.htm';
  var data = {
    version: '1.1',
    oid_partner: '201408071000001546',
    platform: '201805110001835179',
    user_id: '13472423583',
    app_request: 'WAP',
    sign_type: 'MD5',
    busi_partner: '101001',
    no_order: new Date().getTime().toString(),
    dt_order: moment(new Date()).format('YYYYMMDDHHMMSS'),
    name_goods: '测试商品',
    info_order: '测试描述',
    money_order: 0.01,
    notify_url: 'https://www.baidu.com',
    // url_return:'',
    // no_agree :'',
    risk_item: JSON.stringify({
      "frms_ware_category": "1008",
      "user_info_mercht_userno": "13472423583",
      "user_info_dt_register": user_info_dt_register
    })
  };

  var datas = [];
  for (var prop in data) {
    datas.push([prop, data[prop]].join('='));
  }

  datas.push('key=201408071000001546_test_2014015')

  datas = datas.sort().join('&');
  var sign = md5(datas,'201408071000001546_test_2014015');
  // var sign = lianlianSign(datas);
  data.sign = sign;

  agent.post(url)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ req_data: data })
    .end(function (err, result) {
      console.log(err);
      console.log(result.text);
    });
}
lianlianPay();
