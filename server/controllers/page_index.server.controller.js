/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var articleLogic = require('../logics/article');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
exports.index = function (req, res, next) {
  console.log(req.headers.host);

  if(req.headers.host==='m.chaoqianwang.com'){
    return res.redirect('/mip');
  }
  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  productLogic.productList({sort_key:'update_time',sort_value:-1}, function (err, products) {
    var filepath = path.join(__dirname, '../../web/c_platform/views/home.client.view.html');
    articleLogic.articleList({}, function (err, articles) {
      return res.render(filepath, {
        city: req.cookies.city || '',
        articles: articles || [],
        products: products || [],
        device: req.cookies.device || ''
      });
    });
  });
};

exports.home_mip = function (req, res, next) {
  req.cookies.city = req.params.city || req.cookies.city || '';
  cookieLib.setCookie(res, 'city', req.cookies.city);
  productLogic.productList({}, function (err, products) {
    var filepath = path.join(__dirname, '../../web/c_platform/views/home_mip.client.view.html');
    articleLogic.articleList({}, function (err, articles) {
      return res.render(filepath, {
        city: req.cookies.city || '',
        articles: articles || [],
        products: products || [],
        device: req.cookies.device || ''
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
  productLogic.productDetail(req.params.product_id, function (err, product) {
    if (product.article_list && product.article_list.length > 0) {
      articleLogic.articleListByIds(product.article_list, function (err, article_list) {
        articleLogic.articleSingleList({}, function (err, article_single_list) {
          var filepath = path.join(__dirname, '../../web/c_platform/views/article_detail.client.view.html');
          return res.render(filepath, { city: req.cookies.city || '', article: article_list[0], article_single_list: article_single_list });
        })
      });
    }
    else {
      var filepath = path.join(__dirname, '../../web/c_platform/views/article_detail.client.view.html');
      return res.render(filepath, { city: req.cookies.city || '', article: {}, article_single_list: [] });
    }

  });
};

exports.article_detail = function (req, res, next) {
  articleLogic.articleDetail(req.params.article_id, function (err, article) {
    articleLogic.articleSingleList({}, function (err, article_single_list) {
      var filepath = path.join(__dirname, '../../web/c_platform/views/article_detail.client.view.html');
      return res.render(filepath, { city: req.cookies.city || '', article: article, article_single_list: article_single_list });
    });
  });
};

exports.backend_signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_platform/views/backend_signin.client.view.html');
  console.log(filepath);
  return res.sendFile(filepath);
};