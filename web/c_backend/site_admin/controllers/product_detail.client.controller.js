/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'QiniuService', 'ProductNetwork', 'ArticleNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $timeout, QiniuService, ProductNetwork, ArticleNetwork, CommonHelper) {
    QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $timeout(function () {
        $scope.product.logo = QiniuService.getQiniuImageSrc(info.key);
      }, 100)
      console.log('upload successs : ---- ', info);
    });

    QiniuService.createUploader('qiniu-upload-gonglue-button', function (info) {
      $timeout(function () {
        $scope.product.gong_lue_img = QiniuService.getQiniuImageSrc(info.key);
      }, 100)
      console.log('upload successs : ---- ', info);
    });

    $scope.article_list = [];
    $scope.select_article_list = [];

    $scope.articleList = function () {
      ArticleNetwork.articleList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.article_list = data;
          $scope.product.article_list = $scope.product.article_list || [];

          $scope.product.article_list.forEach(function (pid) {
            $scope.select_article_list.push($scope.article_list.filter(function (p) {
              return p._id === pid;
            })[0]);
          });
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.clickArticle = function (article) {
      var index = -1;
      for (var i = 0; i < $scope.select_article_list.length; i++) {
        if ($scope.select_article_list[i]._id === article._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        $scope.select_article_list.push(article);
      }
    }

    $scope.removeArticle = function (article) {
      var index = -1;
      for (var i = 0; i < $scope.select_article_list.length; i++) {
        if ($scope.select_article_list[i]._id === article._id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        $scope.select_article_list.splice(index, 1);
      }
    }

    $scope.product = {
      _id: $stateParams.product_id,
      name: '',
      logo: '',
      description: '',
      article_list: [],
      min_limit: '',
      max_limit: '',
      refer_cost_per_day: '',
      fee_cost_per_day: '',
      longest_time: '',
      fee_info: '',
      apply_success_percent: '',
      apply_people_count: '',
      apply_info: '',
      other_info: '',
      apply_strategy: '',
      organization_url: '',
      organization_info: '',
      wechat_detail_info: '',
      shart_url_short: '',
      risk_codes: '',
      gong_lue_img: '',
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      str5: '',
      str6: '',
      str7: '',
      str8: '',
      str9: '',
      str10: '',
      str11: '',
      str12: '',
      str13: 0,
      str14: 0,
      str15: 0,
      str16: 0,
      str17: 0,
      str18: 0,
    };

    $scope.updateProduct = function (event) {

      var article_list = $scope.select_article_list.map(function (item) {
        return item._id;
      });
      $scope.product.article_list = article_list;

      ProductNetwork.updateProduct($scope, { product_info: $scope.product }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('product_detail', { product_id: data._id }, { reload: true });
          }, null, null, event);
        }


        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function productDetail() {
      if ($scope.product._id) {
        ProductNetwork.productDetail($scope, { product_id: $scope.product._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.product = data;

            $scope.articleList();
          }
        }, function (err) {
          console.log(err);
        });
      }
    }

    function product_history_list_by_name() {
      if ($scope.product._id) {
        ProductNetwork.product_history_list_by_name($scope, { name: $scope.product.name }).then(function (data) {
          console.log(data);
          if (!data.err) {
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    productDetail();
    product_history_list_by_name();
  }]);
