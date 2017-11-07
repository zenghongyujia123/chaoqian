/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CardDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'CardNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, CardNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-card-log-button', function (info) {
      $scope.card.logo = QiniuService.getQiniuImageSrc(info.key);
      console.log('upload successs : ---- ', info);
    });

    $scope.card = {
      _id: $stateParams.card_id,
      name: '',
      logo: '',
      description: '',
    };

    $scope.updateCard = function (event) {
      CardNetwork.updateCard($scope, { card_info: $scope.card }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('card_detail', { card_id: data._id }, { reload: true });
          }, null, null, event);
        }
        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function cardDetail() {
      if ($scope.card._id) {
        CardNetwork.cardDetail($scope, { card_id: $scope.card._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.card = data;
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    cardDetail();
  }]);
