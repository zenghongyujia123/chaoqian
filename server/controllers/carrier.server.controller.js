/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user');
var path = require('path');
var agent = require('superagent').agent();


exports.page_carrier_success = function (req, res, next) {
  var user = req.user;
  var token = req.query.token || req.params.token;

  userLogic.saveCarrierToken(user, token, function () {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/carrier_success_callback.client.view.html');
    console.log(user);

    get_carrier_detail(token, function (err, detail) {
      userLogic.saveCarrierDetail(user, detail, function () {
        console.log('detail', detail);
      });
    });

    return res.render(filepath, { city: req.cookies.city });
  });
};
exports.page_carrier_failed = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/carrier_failed_callback.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};
exports.page_carrier_callback = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/carrier_callback.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.page_carrier_url = function (req, res, next) {
  var user = req.user;
  agent.get('http://e.apix.cn/apixanalysis/mobile/yys/phone/carrier/page?success_url=http://chaoqianwang.com/carrier/page_carrier_success?userid=' + user._id + '&failed_url=http://chaoqianwang.com/carrier/page_carrier_failed&callback_url=http://chaoqianwang.com/carrier/page_carrier_callback')
    .set('apix-key', '92fd3f3bf03a40087fe4ece5bba355cf')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .end(function (err, result) {
      console.log('err----->');
      console.log(err);
      console.log('result----->');
      result = JSON.parse(result.text);
      url = result.url;
      console.log();
      return res.redirect(url);
    });
};

function get_carrier_detail(token, callback) {
  agent.get('http://e.apix.cn/apixanalysis/mobile/retrieve/phone/data/analyzed?query_code=' + token)
    .set('apix-key', '92fd3f3bf03a40087fe4ece5bba355cf')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .end(function (err, result) {
      console.log('err----->');
      console.log(err);
      console.log('result----->');
      result = JSON.parse(result.text);
      console.log(result);
      return callback(null, result.text);
    });
}
