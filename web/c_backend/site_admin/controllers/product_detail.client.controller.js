/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'ProductNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, ProductNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $scope.product.logo = QiniuService.getQiniuImageSrc(info.key);
      console.log('upload successs : ---- ', info);
    });

    $scope.product = {
      _id: $stateParams.product_id,
      name: '',
      logo: '',
      description: '',
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
      risk_codes: '',
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
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    productDetail();
  }]);
