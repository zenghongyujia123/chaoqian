/**
 * Created by zenghong on 2017/8/8.
 */
var shujuMofangLogic = require('./../logics/shuju_mofang');
var path = require('path');
var agent = require('superagent').agent();

exports.shuju_mofang_callback_taobao = function (req, res, next) {
  console.log(req.query);
  shujuMofangLogic.shuju_mofang_callback_update(req.query.passback_params, 'taobao_info', req.query, function () {
    return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.query.passback_params + '&device=native');
  })
};


exports.shuju_mofang_page_taobao = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/tb?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_taobao') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
};

exports.shuju_mofang_callback_jingdong = function (req, res, next) {
  console.log(req.query);
  shujuMofangLogic.shuju_mofang_callback_update(req.query.passback_params, 'jingdong_info', req.query, function () {
    return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.query.passback_params + '&device=native');
  })
};


exports.shuju_mofang_page_jingdong = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/jd?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_jingdong') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
};

exports.shuju_mofang_callback_yys = function (req, res, next) {
  console.log(req.query);
  shujuMofangLogic.shuju_mofang_callback_update(req.query.passback_params, 'yys_info', req.query, function () {
    return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.query.passback_params + '&device=native');
  })
};


exports.shuju_mofang_page_yys = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/yys?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_yys') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
};


exports.shuju_mofang_callback_eb = function (req, res, next) {
  console.log(req.query);
  shujuMofangLogic.shuju_mofang_callback_update(req.query.passback_params, 'eb_info', req.query, function () {
    return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.query.passback_params + '&device=native');
  })
};


exports.shuju_mofang_page_eb = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/eb?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_eb') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
};

exports.shuju_mofang_callback_wy = function (req, res, next) {
  console.log(req.query);
  shujuMofangLogic.shuju_mofang_callback_update(req.query.passback_params, 'wy_info', req.query, function () {
    return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.query.passback_params + '&device=native');
  })
};


exports.shuju_mofang_page_wy = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/wy?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_wy') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
};













