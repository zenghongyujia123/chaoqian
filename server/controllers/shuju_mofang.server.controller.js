/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user');
var path = require('path');
var agent = require('superagent').agent();


exports.shuju_mofang_taobao = function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};

exports.shuju_mofang_callback_taobao = function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
  return redirect('/page_wechat/vip_auth_info');
  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};


exports.shuju_mofang_page_taobao = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/ds/000103?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_taobao') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};



