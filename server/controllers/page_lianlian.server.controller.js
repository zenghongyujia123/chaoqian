/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var agent = require('superagent').agent();
var productLogic = require('../logics/product');
var userLogic = require('../logics/user');
var soldRecordLogic = require('../logics/sold_record');
var jietiaoLogic = require('../logics/jietiao');
var cardLogic = require('../logics/card');

var smsLib = require('../../libraries/sms');
var cookieLib = require('../../libraries/cookie');


var lianlianLib = require('../../libraries/lianlian');

function getPayInfoDetailByType(pay_type) {
  var detail = {};
  if (pay_type === 'vip_2_pay') {
    // detail.pay_price = 50;//
    detail.pay_price = 0.01;
    detail.pay_title = '潮钱网VIP充值';
    detail.pay_type = 'vip_2_pay';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/vip_auth_info?device=native'
  }
  if (pay_type === 'vip_pay') {
    // detail.pay_price = 50;//
    detail.pay_price = 0.01;
    detail.pay_title = '潮钱网VIP打款卡验证';
    detail.pay_type = 'vip_pay';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/vip_auth_info?device=native'
  }
  else if (pay_type === 'query_大数据') {
    // detail.pay_price = 0.01;
    detail.pay_price = 9.9;
    detail.pay_title = '潮钱网充值中心-网贷成功率查询';
    detail.pay_type = 'query_大数据';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/page_query_main?device=native'
  }
  else if (pay_type === 'query_黑中介') {
    // detail.pay_price = 0.01;
    detail.pay_price = 0.99;
    detail.pay_title = '潮钱网充值中心-网贷黑中介查询';
    detail.pay_type = 'query_黑中介';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/page_query_main?device=native'
  }
  else if (pay_type === 'query_黑灰行为') {
    // detail.pay_price = 0.01;
    detail.pay_price = 9.9;
    detail.pay_title = '潮钱网充值中心-网贷黑灰行为查询'
    detail.pay_type = 'query_黑灰行为';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/page_query_main?device=native'
  }
  else if (pay_type === 'postcode_pay') {
    detail.pay_price = 69;
    // detail.pay_price = 0.01;
    detail.pay_title = '潮钱网充值中心-激活码'
    detail.pay_type = 'postcode_pay';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/paycredit?device=native'
  }
  else if (pay_type === 'pos_suixingfu') {
    detail.pay_price = 120;//12000
    // detail.pay_price = 0.01;//12000
    detail.pay_title = '潮钱网充值中心-随行付刷卡机'
    detail.pay_type = 'pos_suixingfu';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/page_query_main?device=native'
  }
  else if (pay_type === 'pos_xinguodu') {
    // detail.pay_price = 0.01;//39900
    detail.pay_price = 399;//39900
    detail.pay_title = '潮钱网充值中心-新国都刷卡机'
    detail.pay_type = 'pos_xinguodu';
    detail.redirect = 'http://www.chaoqianwang.com/page_wechat/page_query_main?device=native'
  }
  else {
    return null;
  }
  return detail;
}


exports.page_lianlian = function (req, res, next) {
  var detail = getPayInfoDetailByType(req.query.pay_type || '');

  if (!detail) {
    return res.send({ err: { type: 'invalid_pay_type', message: '支付类型无效，请联系管理员！' } });
  }

  soldRecordLogic.new_sold_record(req.user, detail.pay_type, req.query, function (err, result) {
    if (err) {
      return res.send(err);
    }
    detail.no_order = result._id.toString();
    lianlianLib.get_lianlian_pay_data(req.user, detail, function (result) {
      return res.redirect('https://wap.lianlianpay.com/payment.htm?req_data=' + result);
    })
  });
}

exports.notify_url = function (req, res, next) {
  console.log(req.reqData.toString('utf8'));
  console.log(JSON.parse(req.reqData.toString('utf8')).oid_partner);
  var info = JSON.parse(req.reqData.toString('utf8'));
  soldRecordLogic.update_by_lianlianpay(info, function (err, userPay) {
    if (userPay) {
      userLogic.updateVipPayedByOpenid({ user_id: userPay.user_id }, info, function () { })
    }

    if (userPay.execute_params.post_url) {
      agent.post(userPay.execute_params.post_url)
        .set('Cookie', 'user_id=' + userPay.user_id)
        .send(userPay.execute_params)
        .end(function (err, res) {
          console.log(res.text);
          console.log(res.body);
        });
    }
    return res.send({
      "ret_code": "0000",
      "ret_msg": "交易成功"
    }
    )
  })
}

exports.url_return = function (req, res, next) {
  if (req.body.res_data) {
    var data = JSON.parse(req.body.res_data);
    soldRecordLogic.get_by_id({ detail_id: data.no_order }, function (err, result) {
      var url = getPayInfoDetailByType(result.type).redirect;
      console.log(url)
      cookieLib.setCookie(res, 'user_id', result.user_id.toString());
      return res.redirect(url)
    })
  }
  else {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/lianlianpay/index.client.view.html');
    return res.render(filepath)
  }
}