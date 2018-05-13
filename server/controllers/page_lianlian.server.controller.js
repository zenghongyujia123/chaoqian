/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var jietiaoLogic = require('../logics/jietiao');
var cardLogic = require('../logics/card');
var smsLib = require('../../libraries/sms');


var lianlianLib = require('../../libraries/lianlian');

exports.page_lianlian = function (req, res, next) {
  lianlianLib.get_lianlian_pay_data(function (result) {
    return res.redirect('https://wap.lianlianpay.com/payment.htm?req_data=' + result);
  })
}

exports.notify_url = function (req, res, next) {
  console.log(req.body);
  console.log(req.query);
  console.log(req.params);
}

exports.url_return = function (req, res, next) {
  console.log(JSON.parse( req.body.res_data));
  
}