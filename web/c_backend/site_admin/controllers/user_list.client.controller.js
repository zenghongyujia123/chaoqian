/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }
    $scope.user_list = [];
    $scope.userList = function () {
      UserNetwork.userList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.userList();

    $scope.getVipStatus = function (status) {
      var map = {
        'un_submit': {
          text: '未递交'
        },
        'submit': {
          text: '已递交'
        },
        'passed': {
          text: '审核通过'
        },
      }
    }
  }]);
