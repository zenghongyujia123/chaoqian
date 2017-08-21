/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var ProductFilter = appDb.model('ProductFilter');
var sysErr = require('./../errors/system');

var that = exports;
exports.updateFilter = function (filterInfo, callback) {
  ProductFilter.findOne({}, function (err, filter) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    if (!filter) {
      filter = new ProductFilter();
    }

    filter.brain_sort = filterInfo.brain_sort || [];
    filter.loan_limit = filterInfo.loan_limit || [];
    filter.working_identity = filterInfo.working_identity || [];
    filter.personal_natural = filterInfo.personal_natural || [];
    filter.cycle_time = filterInfo.cycle_time || [];
    filter.loan_term = filterInfo.loan_term || [];
    filter.save(function (err, saveFilter) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, saveFilter);
    })
  });
};

exports.getFilter = function (callback) {
  ProductFilter.findOne({}, function (err, filter) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!filter) {
      filter = new ProductFilter({});
    }

    return callback(null, filter);
  });
}