/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('JietiaoDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'QiniuService', 'ProductNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $timeout, QiniuService, ProductNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $timeout(function () {
        $scope.jietiao.logo = QiniuService.getQiniuImageSrc(info.key);
        console.log('upload successs : ---- ', info);
      });
    });

    $scope.jietiao = {
      _id: $stateParams.jietiao_id,
      logo: '',
      name: '',
      require: '',
      str1: '',
      str2: '',
      url: '',
    };

    $scope.updateJietiao = function (event) {
      ProductNetwork.updateJietiao($scope, { jietiao_info: $scope.jietiao }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('jietiao_detail', null, { reload: true });
          }, null, null, event);
        }


        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function jietiaoDetail() {
      if ($scope.jietiao._id) {
        ProductNetwork.jietiaoDetail($scope, { jietiao_id: $scope.jietiao._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.jietiao = data;
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    jietiaoDetail();
  }]);
