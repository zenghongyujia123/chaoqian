/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Product = appDb.model('Product');
var ProductHistory = appDb.model('ProductHistory');
var async = require('async');
var moment = require('moment');
var agent = require('superagent').agent();
var sysErr = require('./../errors/system');

var that = exports;

exports.product_history_list_by_name = function (name, callback) {
  ProductHistory.aggregate([
    {
      $match: {
        name: name
      }
    },
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$create_time" } },
        ip: '$ip',
        name: '$name'
      }
    },
    {
      $group: {
        _id: { date: '$date', ip: '$ip' },
        click_count: { $sum: 1 },
        date: { $first: '$date' }
      }
    },
    {
      $group: {
        _id: '$date',
        date: { $first: 1 },
        click_count: { $sum: '$click_count' },
        ip_count: { $sum: 1 }
      }
    }
  ]).exec(function (err, results) {
    if (err) {
      console.log(JSON.stringify(err));
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}

exports.product_history_list = function (info, callback) {
  var match = {};
  if (info.type) {
    match.type = info.type;
  }
  else {
    match.$or = [{ type: '' }, { type: 'product' }];
  }

  if (info.start_time) {
    if (info.end_time) {
      match.$and = [
        {
          create_time: { $gte: new Date(info.start_time) }
        },
        {
          create_time: { $lte: new Date(info.end_time) }
        }];
    }
    else {
      match.create_time = { $gte: new Date(info.start_time) };
    }
  }

  ProductHistory.aggregate([
    {
      $match: match
    },
    {
      $group: {
        _id: { name: '$name', ip: '$ip' },
        click_count: { $sum: 1 },
        name: { $first: '$name' }
      }
    },
    {
      $group: {
        _id: '$name',
        name: { $first: '$name' },
        click_count: { $sum: '$click_count' },
        ip_count: { $sum: 1 }
      }
    }
  ]).exec(function (err, results) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}

exports.update_product_history = function (user_id, name, ip, type, callback) {
  new ProductHistory({
    name: name,
    user: user_id,
    ip: ip,
    type: type,
    create_time_day: moment(new Date()).format('YYYY-MM-DD')
  }).save(function () {
    return callback();
  })
}

function updateUserTime() {
  var count = 1;
  ProductHistory.find({ create_time_day: { $exists: false } }, function (err, historys) {
    async.eachSeries(historys, function (history, eachCallback) {
      history.create_time_day = moment(history.create_time).format('YYYY-MM-DD')
      history.save(function (err, savedUser) {
        count += 1;
        console.log('count:' + count);
        return eachCallback();
      });
    });
  });
}
updateUserTime();



exports.getProductShareUrl = function (productInfo, callback) {
  var url = 'http://www.chaoqianwang.com/page_h5/third_page?url=' + encodeURIComponent(productInfo.organization_url) + '&product_name=' + productInfo.name;
  agent.get('http://api.t.sina.com.cn/short_url/shorten.json?source=3271760578&url_long=' + encodeURIComponent(url))
    .end(function (err, data) {
      return callback(err, data.body);
    });
}

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
    product.article_list = productInfo.article_list || [];
    product.gong_lue_img = productInfo.gong_lue_img;
    product.shart_url_short = productInfo.shart_url_short;
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
    product.str3s = productInfo.str3.split(',');
    product.str4 = productInfo.str4;
    product.str5 = productInfo.str5;
    product.str6 = productInfo.str6;
    product.str6s = productInfo.str6.split(',')
    product.str7 = productInfo.str7;
    product.str7s = productInfo.str7.split(',')
    product.str8 = productInfo.str8;
    product.str8s = productInfo.str8.split(',')
    product.str9 = productInfo.str9;
    product.str10 = productInfo.str10;
    product.str11 = productInfo.str11;
    product.str12 = productInfo.str12;

    //排序相关
    product.str13 = productInfo.str13;
    product.str14 = productInfo.str14;
    product.str15 = productInfo.str15;
    product.str16 = productInfo.str16;
    product.str17 = productInfo.str17;
    product.str18 = productInfo.str18;
    product.update_time = new Date();

    //   product.ma
    product.save(function (err, savedProduct) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, savedProduct);
    });
  })

};

exports.productList = function (info, callback) {
  var query = {};
  var sort = {};
  if (info.sort_key) {
    sort[info.sort_key] = info.sort_value ;
  }

  if (info.query_key) {
    query[info.query_key] = info.query_value;
  }

  Product.find(query).sort(sort).exec(function (err, products) {
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