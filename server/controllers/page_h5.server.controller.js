/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');


exports.page_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_h5/views/page_signin.html');
  return res.render(filepath, {});
}
exports.page_signup = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_h5/views/page_signup.html');
  return res.render(filepath, {});
}

exports.page_list_qq = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_h5/views/page_list_qq.html');
  return res.render(filepath, {});
}
