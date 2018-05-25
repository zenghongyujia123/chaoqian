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

  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};


exports.shuju_mofang_page_taobao = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/tb?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_taobao') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};

exports.shuju_mofang_callback_jingdong = function (req, res, next) {
  console.log(req.query);
  shujuMofangLogic.shuju_mofang_callback_update(req.query.passback_params, 'jingdong_info', req.query, function () {
    return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.query.passback_params + '&device=native');
  })

  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};


exports.shuju_mofang_page_jingdong = function (req, res, next) {
  console.log(req.params);
  var url = 'https://open.shujumohe.com/box/jd?box_token=BE7A576504424A2494EF3633F7110B50&cb=' +
    encodeURIComponent('http://www.chaoqianwang.com/shuju_mofang_callback_jingdong') + '&passback_params=' + req.user._id.toString();
  return res.redirect(url);
  // return res.redirect('/page_wechat/vip_auth_info?user_id=' + req.body.passback_params);
};






