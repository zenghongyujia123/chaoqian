/**
 * Created by zenghong on 2017/8/8.
 */
module.exports = function (appDb) {
  require('./user')(appDb);
  require('./product')(appDb);
  require('./product_filter')(appDb);
};