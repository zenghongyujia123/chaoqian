/**
 * Created by zenghong on 2017/8/8.
 */
var userLogic = require('./../logics/user');
var path = require('path');
var agent = require('superagent').agent();


exports.page_pbc_success = function (req, res, next) {
  var user = req.user;
  var token = req.query.token || req.params.token;

  userLogic.savePbcToken(user, token, function () {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/page_pbc_success.client.view.html');
    console.log(user);

    get_pbc_detail(token, function (err, detail) {
      userLogic.savePbcDetail(user, detail, function () {
        console.log('detail', detail);
      });
    });

    return res.render(filepath, { city: req.cookies.city });
  });
};
exports.page_pbc_failed = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_pbc_failed.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};
exports.page_pbc_callback = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_pbc_callback.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.page_pbc_url = function (req, res, next) {
  var user = req.user;
  agent.get('http://e.apix.cn/apixanalysis/pbccrc/grant/credit/pbc/page?success_url=http://chaoqianwang.com/carrier/page_pbc_success?user_id=' + user._id + '&failed_url=http://chaoqianwang.com/carrier/page_pbc_failed&callback_url=http://chaoqianwang.com/carrier/page_pbc_callback')
    .set('apix-key', 'd3bb7276d4364ee97cdb808ef6b043a8')
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

function get_pbc_detail(token, callback) {
  agent.get('http://e.apix.cn/apixanalysis/pbccrc/retrieve/credit/data/query?query_code=' + token)
    .set('apix-key', 'd3bb7276d4364ee97cdb808ef6b043a8')
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
