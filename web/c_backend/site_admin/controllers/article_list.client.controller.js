/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ArticleListController', [
    '$rootScope', '$scope', '$state', '$stateParams', 'ArticleNetwork',
    function ($rootScope, $scope, $state, $stateParams, ArticleNetwork) {
        $scope.goDetail = function (id) {
            $state.go('article_detail', { article_id: id || '' });
        }
        $scope.article_list = [];
        $scope.articleList = function (callback) {
            ArticleNetwork.articleList($scope, {}).then(function (data) {
                console.log(data);
                if (!data.err) {
                    $scope.article_list = data;
                }
                if (callback) {
                    return callback();
                }
            }, function (err) {
                console.log(err);
            });
        };

      
        $scope.articleList(function () {
        });
    }]);
