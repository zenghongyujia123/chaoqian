/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/index');

module.exports = function (app) {
  app.route('/').get(index.index);
};