/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('AchievementListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'QiniuService', 'UserNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $timeout, QiniuService, UserNetwork, CommonHelper) {
    // var name = ''
    // $scope.goDetail = function (id) {
    //   // $state.go('product_detail', { product_id: id || '' });
    //   name = prompt("输入code", "");
    //   $scope.create_postcode(name);
    // }

    var pageConfig = {
      user_parent: '',
      list: [],
      parent_rewards_by_user_parent: function () {
        UserNetwork.parent_rewards_by_user_parent($scope, { user_parent: pageConfig.user_parent }).then(function (data) {
          console.log(data);
          if (!data.err) {
            pageConfig.list = data;
          }
        }, function (err) {
          console.log(err);
        });
      },
      update_parent_rewards_status: function (item) {
        UserNetwork.update_parent_rewards_status($scope, { userpay_id: item._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              item = data;
            }, null, null, event);
          }
        }, function (err) {
          console.log(err);
        });
      },
      search: function () {
        pageConfig.parent_rewards_by_user_parent();
      }
    };
    $scope.pageConfig = pageConfig;
  }]);
