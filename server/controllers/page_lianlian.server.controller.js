/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var userLogic = require('../logics/user');
var soldRecordLogic = require('../logics/sold_record');
var jietiaoLogic = require('../logics/jietiao');
var cardLogic = require('../logics/card');
var smsLib = require('../../libraries/sms');


var lianlianLib = require('../../libraries/lianlian');

exports.page_lianlian = function (req, res, next) {
  var detail = {};
  var pay_type = req.query.pay_type || '';
  if (pay_type === 'vip_pay') {
    detail.pay_price = 299;
    detail.pay_title = '潮钱网充值中心-会员充值';
    detail.pay_type = 'vip_pay';
  }
  else if (pay_type === 'query_大数据') {
    detail.pay_price = 9.9;
    detail.pay_title = '潮钱网充值中心-网贷成功率查询';
    detail.pay_type = 'query_大数据';
  }
  else if (pay_type === 'query_黑中介') {
    detail.pay_price = 0.01;
    // detail.pay_price = 0.99;
    detail.pay_title = '潮钱网充值中心-网贷黑中介查询';
    detail.pay_type = 'query_黑中介';
  }
  else if (pay_type === 'query_黑灰行为') {
    detail.pay_price = 9.9;
    detail.pay_title = '潮钱网充值中心-网贷黑灰行为查询'
    detail.pay_type = 'query_黑灰行为';
  }
  else if (pay_type === 'postcode_pay') {
    detail.pay_price = 69;
    detail.pay_title = '潮钱网充值中心-激活码'
    detail.pay_type = 'postcode_pay';
  }
  else if (pay_type === 'pos_suixingfu') {
    detail.pay_price = 120;//12000
    detail.pay_title = '潮钱网充值中心-随行付刷卡机'
    detail.pay_type = 'pos_suixingfu';
  }
  else if (pay_type === 'pos_xinguodu') {
    detail.pay_price = 399;//39900
    detail.pay_title = '潮钱网充值中心-新国都刷卡机'
    detail.pay_type = 'pos_xinguodu';
  }
  else {
    return res.send({ err: { type: 'invalid_pay_type', message: '支付类型无效，请联系管理员！' } });
  }

  soldRecordLogic.new_sold_record(req.user, detail.pay_type, function (err, result) {
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
     userLogic.updateVipPayedByOpenid({user_id:userPay.user_id},info,function(){})
    }
    return res.send({
      "ret_code": "0000",
      "ret_msg": "交易成功"
    }
    )
  })
}

exports.url_return = function (req, res, next) {

  if (req.body.res_data)
    console.log(JSON.parse(req.body.res_data));
  var filepath = path.join(__dirname, '../../web/c_wechat/views/lianlianpay/index.client.view.html');

  return res.render(filepath)
}