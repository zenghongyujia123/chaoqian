/**
 * Created by zenghong on 2017/8/8.
 */
var articleLogic = require('./../logics/article');

exports.updateArticle = function (req, res, next) {
  articleLogic.updateArticle(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};


exports.articleList = function (req, res, next) {
  articleLogic.articleList(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};


exports.articleDetail = function (req, res, next) {
  articleLogic.articleDetail(req.body.article_id, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
};

exports.increase_read_count = function (req, res, next) {
  articleLogic.increase_read_count(req.body.article_id || req.query.article_id, function (err, result) {
    if (err) {
      return next(err);
    }
    req.data = result;
    return next();
  });
}



