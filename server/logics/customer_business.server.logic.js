/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Record = appDb.model('Record');
var sysErr = require('./../errors/system');

var that = exports;

/**
 * 深拷贝js对象
 * @param obj
 * @returns {{}}
 *  Created by shantao on 2016/2/1.
 */
var deepCopy = function(obj) {
  var newO = new Record({});
  if (obj instanceof Array) {
    newO = [];
  }
  for ( var key in obj) {
    var val = obj[key];
    newO[key] = typeof val === 'object' ? arguments.callee(val) : val;
  }
  return newO;
}

exports.updateRecord = function (recordInfo, callback) {

  if (!recordInfo._id) {
    recordInfo._id = mongoose.generateNewObjectId();
  }
//if (!record) {
  var record = new Record({});
//} 

  record=deepCopy(recordInfo);

  record.save(function (err, savedRecord) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, savedRecord);
    });
};


exports.recordList = function (info, callback) {
  var query = {};
  var sort = {};
  /*
  if (info.sort_key) {
    sort[info.sort_key] = info.sort_value || 1;
  }

  if (info.query_key) {
    query[info.query_key] = info.query_value;
  }
*/
  Record.find(info).sort(sort).exec(function (err, records) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, records);
  });
};

/*
exports.productListByIds = function (ids, callback) {
  ids = ids || [];
  Product.find({ _id: { $in: ids } }, function (err, products) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, products);
  });
};

exports.productDetail = function (productId, callback) {
  Product.findOne({ _id: productId }, function (err, product) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, product);
  });
};

exports.productsByRiskCode = function (codes, callback) {
  codes = codes || [];
  Product.find({ risk_codes: { $in: codes } }).limit(8).exec(function (err, products) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, products)
  })
}
*/