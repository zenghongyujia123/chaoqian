/**
 * Created by zenghong on 2017/8/8.
 */
module.exports = function (appDb) {
  require('./user')(appDb);
  require('./third_query')(appDb);
  require('./product')(appDb);
  require('./jietiao')(appDb);
  require('./card')(appDb);
  require('./product_filter')(appDb);
  require('./credit_people')(appDb);
  require('./customer_business')(appDb);
  require('./postcode')(appDb);
};