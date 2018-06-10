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
      show_type: 'user_parent',//top_user_parent
      keyword: '',
      list: [],
      change_type: function (type) {
        pageConfig.show_type = type;
        pageConfig.parent_rewards_by_user_parent();
      },
      parent_rewards_by_user_parent: function () {
        var query = {};
        query[pageConfig.show_type] = pageConfig.user_parent;
        UserNetwork.parent_rewards_by_user_parent($scope, query).then(function (data) {
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
              pageConfig.parent_rewards_by_user_parent();
            }, null, null, event);
          }
        }, function (err) {
          console.log(err);
        });
      },
      search: function () {
        if (!pageConfig.keyword) {
          return;
        }
        pageConfig.parent_rewards_by_user_parent();
      }
    };
    $scope.pageConfig = pageConfig;
  }]);
