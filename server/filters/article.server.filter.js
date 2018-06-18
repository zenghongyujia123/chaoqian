'use strict';

var articleLogic = require('./../logics/article');
var articleErr = require('./../errors/article');

exports.requireArticle = function (req, res, next) {
    var article_id = req.body.article_id || req.query.article_id || '';
    if (!article_id) {
        return next(articleErr.article_id_empty);
    }

    articleLogic.articleDetail(article_id,function(err,result){
        if(err){
            return next(err);
        }

        if(!result){
            return next(articleErr.article_not_exist);
        }

        req.article = result;
        return next();
    });
};