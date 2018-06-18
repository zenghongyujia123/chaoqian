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



