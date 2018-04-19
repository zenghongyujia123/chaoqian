/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('PostCodeListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'QiniuService', 'PostCodeNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $timeout, QiniuService, PostCodeNetwork, CommonHelper) {
    var name = ''
    $scope.goDetail = function (id) {
      // $state.go('product_detail', { product_id: id || '' });
      name = prompt("输入code", "");
      $scope.create_postcode(name);
    }

    $scope.postcode_list = [];
    $scope.list = function () {
      PostCodeNetwork.list($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.postcode_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.create_postcode = function (name) {
      if(name){
        PostCodeNetwork.create_postcode($scope, {number:name}).then(function (data) {
          console.log(data);
          if (!data.err) {
            $state.go('postcode_list', { }, { reload: true });
          }
        }, function (err) {
          console.log(err);
        });
      }
    }

    $scope.list();
  }]);
