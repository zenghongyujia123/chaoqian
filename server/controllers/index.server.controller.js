/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');

exports.index = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/site_platform/views/index.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};