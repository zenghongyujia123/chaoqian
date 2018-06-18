'use strict';
cSite.factory('ArticleNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateArticle: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/article/updateArticle', params);
        },
        articleList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/article/articleList', params);
        },
        articleDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/article/articleDetail', params);
        },
      };
    }]);
