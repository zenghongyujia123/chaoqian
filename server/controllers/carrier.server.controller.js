/**
 * Created by zenghong on 2017/8/8.
 */
var productLogic = require('./../logics/product');
var agent = require('superagent').agent();


exports.carrier_success_callback = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/carrier_success_callback.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};
exports.carrier_failed_callback = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/carrier_failed_callback.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};
exports.carrier_callback = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/carrier_callback.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.get_carrier_url = function (req, res, next) {
  agent.get('http://e.apix.cn/apixanalysis/mobile/yys/phone/carrier/page?success_url=http://chaoqianwang.com/carrier/carrier_success_callback&failed_url=http://chaoqianwang.com/carrier/carrier_failed_callback&callback_url=http://chaoqianwang.com/carrier/carrier_callback')
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

