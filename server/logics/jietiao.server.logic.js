/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var JieTiao = appDb.model('JieTiao');
var sysErr = require('./../errors/system');

var that = exports;

exports.updateJietiao = function (jietiaoInfo, callback) {

  if (!jietiaoInfo._id) {
    jietiaoInfo._id = mongoose.generateNewObjectId();
  }

  that.jietiaoDetail(jietiaoInfo._id, function (err, jietiao) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!jietiao) {
      jietiao = new JieTiao({});
    }

    jietiao.name = jietiaoInfo.name;
    jietiao.logo = jietiaoInfo.logo;
    jietiao.require = jietiaoInfo.require;
    jietiao.str1 = jietiaoInfo.str1 || '';
    jietiao.str1s = jietiaoInfo.str1.split(',');
    jietiao.str2 = jietiaoInfo.str2 || '';
    jietiao.str2s = jietiaoInfo.str2.split(',');
    //   product.ma
    jietiao.save(function (err, savedJietiao) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, savedJietiao);
    });
  })

};

exports.jietiaoList = function (info, callback) {
  var query = {};
  var sort = {};
  if (info.sort_key) {
    sort[info.sort_key] = info.sort_value || 1;
  }

  if (info.query_key) {
    query[info.query_key] = info.query_value;
  }

  JieTiao.find(query).sort(sort).exec(function (err, jietiaos) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, jietiaos);
  });
};

exports.jietiaoListByIds = function (ids, callback) {
  ids = ids || [];
  JieTiao.find({ _id: { $in: ids } }, function (err, jietiaos) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, jietiaos);
  });
};

exports.jietiaoDetail = function (jietiaoId, callback) {
  JieTiao.findOne({ _id: jietiaoId }, function (err, jietiao) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, jietiao);
  });
};

exports.jietiaosByRiskCode = function (codes, callback) {
  codes = codes || [];
  JieTiao.find({ risk_codes: { $in: codes } }).limit(8).exec(function (err, jietiaos) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, jietiaos)
  })
}