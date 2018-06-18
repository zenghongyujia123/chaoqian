/**
 * Created by zenghong on 2017/8/8.
 */

var articleController = require('../controllers/article');
var articleFilter = require('../filters/article');

module.exports = function (app) {
  app.route('/article/updateArticle').post(articleController.updateArticle);
  app.route('/article/articleList').post(articleController.articleList);

  
  app.route('/article/articleDetail').post(articleFilter.requireArticle, articleController.articleDetail);
};