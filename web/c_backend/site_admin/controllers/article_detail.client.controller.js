/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ArticleDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'QiniuService', 'ArticleNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $timeout, QiniuService, ArticleNetwork, CommonHelper) {
    QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $timeout(function () {
        $scope.article.image = QiniuService.getQiniuImageSrc(info.key);
      }, 100)
      console.log('upload successs : ---- ', info);
    });

    $scope.article = {
      _id: $stateParams.article_id,
      title: '',
      image: '',
      content: '',
      description: '',
      tag_string: '',
      tag_array: ''
    };

    $scope.updateArticle = function (event) {
      ArticleNetwork.updateArticle($scope, $scope.article).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('article_detail', { article_id: data._id }, { reload: true });
          }, null, null, event);
        }


        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

function articleDetail() {
  if ($scope.article._id) {
    ArticleNetwork.articleDetail($scope, { article_id: $scope.article._id }).then(function (data) {
      console.log(data);
      if (!data.err) {
        $scope.article = data;
      }
    }, function (err) {
      console.log(err);
    });
  }
}
articleDetail();
  }]);
