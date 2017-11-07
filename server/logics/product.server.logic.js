/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Product = appDb.model('Product');
var sysErr = require('./../errors/system');

var that = exports;

exports.updateProduct = function (productInfo, callback) {

  if (!productInfo._id) {
    productInfo._id = mongoose.generateNewObjectId();
  }

  that.productDetail(productInfo._id, function (err, product) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!product) {
      product = new Product({});
    }

    product.name = productInfo.name;
    product.logo = productInfo.logo;
    product.description = productInfo.description;
    product.min_limit = productInfo.min_limit;
    product.max_limit = productInfo.max_limit;
    product.refer_cost_per_day = productInfo.refer_cost_per_day;
    product.longest_time = productInfo.longest_time;
    product.apply_success_percent = productInfo.apply_success_percent;
    product.apply_people_count = productInfo.apply_people_count;
    product.fee_cost_per_day = productInfo.fee_cost_per_day;
    product.fee_info = productInfo.fee_info;
    product.apply_info = productInfo.apply_info;
    product.other_info = productInfo.other_info;
    product.apply_strategy = productInfo.apply_strategy;
    product.organization_info = productInfo.organization_info;
    product.organization_url = productInfo.organization_url;
    product.risk_codes = productInfo.risk_codes;
    product.wechat_detail_info = productInfo.wechat_detail_info;
    product.str1 = productInfo.str1;
    product.str2 = productInfo.str2;
    product.str3 = productInfo.str3;
    product.str4 = productInfo.str4;
    product.str5 = productInfo.str5;
    product.str6 = productInfo.str6;
    product.str7 = productInfo.str7;
    product.str8 = productInfo.str8;
    product.str9 = productInfo.str9;
    product.str10 = productInfo.str10;
    product.str11 = productInfo.str11;
    product.str12 = productInfo.str12;

    product.save(function (err, savedProduct) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, savedProduct);
    });
  })

};

exports.productList = function (callback) {
  Product.find({}, function (err, products) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, products);
  });
};

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