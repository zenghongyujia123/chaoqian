/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }
    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          if (data.carrier_detail) {
            data.carrier_detail = JSON.stringify(JSON.parse(data.carrier_detail), null, 2);
          }
          if (data.pbc_detail) {
            data.pbc_detail = JSON.stringify(JSON.parse(data.pbc_detail), null, 2);
          }
          $scope.user = data;
        }
      }, function (err) {
        console.log(err);
      });
    };
    $scope.getVipStatus = function (status) {
      var map = {
        'un_submit': {
          text: '未递交材料'
        },
        'submit': {
          text: '已递交材料'
        },
        'passed': {
          text: '审核通过'
        }
      }
      return map[status].text;
    }
    $scope.getUserById();

  }]);
