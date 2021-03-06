/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var articleLogic = require('../logics/article');
var jietiaoLogic = require('../logics/jietiao');
var userLogic = require('../logics/user');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');

exports.partner_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/partner_signin.client.view.html');
  return res.render(filepath, {});
}
exports.partner_main = function (req, res, next) {
  userLogic.getParterDatas(req.user.username, function (err, results) {
    var filepath = path.join(__dirname, '../../web/c_platform/views/partner_main.client.view.html');
    return res.render(filepath, { user: req.user, results: results });
  });
}



exports.index = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/home.client.view.html');
  if (req.headers.host === 'm.chaoqianwang.com') {
    filepath = path.join(__dirname, '../../web/c_platform/views/home_mip.client.view.html');
  }

  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  productLogic.productList({ sort_key: 'update_time', sort_value: -1 }, function (err, products) {
    articleLogic.articleList({}, function (err, articles) {
      jietiaoLogic.jietiaoList({}, function (err, jietiaos) {
        return res.render(filepath, {
          city: req.cookies.city || '',
          articles: articles || [],
          products: products || [],
          jietiaos: jietiaos || [],
          device: req.cookies.device || '',
          provinces: provinces.provinces || []
        });

      })
    });
  });
};

exports.home_mip = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/home_mip.client.view.html');

  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  productLogic.productList({}, function (err, products) {
    articleLogic.articleList({}, function (err, articles) {
      jietiaoLogic.jietiaoList({}, function (err, jietiaos) {
        return res.render(filepath, {
          city: req.cookies.city || '',
          articles: articles || [],
          products: products || [],
          jietiaos: jietiaos || [],
          device: req.cookies.device || ''
        });
      });
    });
  });
};

exports.product_list = function (req, res, next) {
  productFilterloigc.getFilter(function (err, filters) {
    if (err) {
      return next(next);
    }
    var filepath = path.join(__dirname, '../../web/c_platform/views/product_list.client.view.html');
    console.log(filters);
    return res.render(filepath, { city: req.cookies.city || '', filters: filters });
  });
};

exports.city_select = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/city_select.client.view.html');
  console.log(provinces);
  return res.render(filepath, { city: req.cookies.city || '', provinces: provinces.provinces });
};

exports.product_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/article_detail.client.view.html');
  if (req.headers.host === 'm.chaoqianwang.com') {
    filepath = path.join(__dirname, '../../web/c_platform/views/article_detail_mip.client.view.html');
  }

  productLogic.productDetail(req.params.product_id, function (err, product) {
    if (product.article_list && product.article_list.length > 0) {
      articleLogic.articleListByIds(product.article_list, function (err, article_list) {
        articleLogic.articleSingleList({}, function (err, article_single_list) {
          articleLogic.increase_read_count(article_list[0]._id, function () {
            return res.render(filepath, { city: req.cookies.city || '', product: product, article: article_list[0], article_single_list: article_single_list });
          });
        })
      });
    }
    else {
      return res.render(filepath, { city: req.cookies.city || '', product: null, article: {}, article_single_list: [] });
    }

  });
};

exports.article_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/article_detail.client.view.html');
  if (req.headers.host === 'm.chaoqianwang.com') {
    filepath = path.join(__dirname, '../../web/c_platform/views/article_detail_mip.client.view.html');
  }

  articleLogic.increase_read_count(req.params.article_id, function () {
    articleLogic.articleDetail(req.params.article_id, function (err, article) {
      articleLogic.articleSingleList({}, function (err, article_single_list) {
        return res.render(filepath, { city: req.cookies.city || '', product: null, article: article, article_single_list: article_single_list });
      });
    });
  })
};

exports.backend_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/backend_signin.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};