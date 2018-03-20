/**
 * Created by zenghong on 2017/8/8.
 */

var jietiaoController = require('../controllers/jietiao');
var jietiaoFilter = require('../filters/jietiao');

module.exports = function (app) {
  app.route('/jietiao/updateJietiao').post(jietiaoController.updateJietiao);
  app.route('/jietiao/jietiaoList').post(jietiaoController.jietiaoList);
  app.route('/jietiao/jietiaoDetail').post(jietiaoFilter.requireJietiao, jietiaoController.jietiaoDetail);
};