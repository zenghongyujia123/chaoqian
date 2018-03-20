/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('JietiaoListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'ProductNetwork',
  function ($rootScope, $scope, $state, $stateParams, ProductNetwork) {
    $scope.goDetail = function (id) {
      $state.go('jietiao_detail', { jietiao_id: id || '' });
    }
    $scope.jietiao_list = [];
    $scope.jietiaoList = function () {
      ProductNetwork.jietiaoList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.jietiao_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.jietiaoList();
  }]);
