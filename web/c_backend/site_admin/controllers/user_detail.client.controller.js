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
            data.carrier_detail = JSON.parse(data.carrier_detail);
          }
          if (data.pbc_detail) {
            data.pbc_detail = JSON.parse(data.pbc_detail);
          }
          $scope.user = data;
        }
      }, function (err) {
        console.log(err);
      });
    };
    $scope.getUserById();
  }]);
