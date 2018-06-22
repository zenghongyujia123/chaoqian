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
    $scope.jietiaoList = function (callback) {
      ProductNetwork.jietiaoList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.jietiao_list = data;
          callback();
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.product_history_list = function () {
      ProductNetwork.product_history_list($scope, {type:'jietiao'}).then(function (data) {
        console.log(data);
        $scope.jietiao_list.forEach(function (product) {
          data.total_result.forEach(function (history) {
            if (product.name === history.name) {
              product.click_count = history.click_count;
              product.ip_count = history.ip_count;
            }


          })
          data.yestoday_result.forEach(function (yestoday) {
            if (product.name === yestoday.name) {
              product.yestoday_click_count = yestoday.click_count;
              product.yestoday_ip_count = yestoday.ip_count;
            }
          })
          data.today_result.forEach(function (today) {
            if (product.name === today.name) {
              product.today_click_count = today.click_count;
              product.today_ip_count = today.ip_count;
            }
          })
        })
      }, function (err) {
        console.log(err);
      });
    };

    $scope.jietiaoList(function(){
      $scope.product_history_list();
    });
  }]);
