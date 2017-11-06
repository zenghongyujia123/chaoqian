/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork) {
    $scope.goDetail = function (user) {
      $state.go('user_detail', { user_id: user._id });
    }
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
  }]);
