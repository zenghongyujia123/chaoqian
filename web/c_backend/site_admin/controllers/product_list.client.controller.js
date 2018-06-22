/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductListController', [
    '$rootScope', '$scope', '$state', '$stateParams', 'ProductNetwork',
    function ($rootScope, $scope, $state, $stateParams, ProductNetwork) {
        $scope.goDetail = function (id) {
            $state.go('product_detail', { product_id: id || '' });
        }
        $scope.product_list = [];
        $scope.productList = function (callback) {
            ProductNetwork.productList($scope, {}).then(function (data) {
                console.log(data);
                if (!data.err) {
                    $scope.product_list = data;
                }
                if (callback) {
                    return callback();
                }
            }, function (err) {
                console.log(err);
            });
        };
        $scope.product_history_list = function () {
            ProductNetwork.product_history_list($scope, {}).then(function (data) {
              console.log(data);
              $scope.product_list.forEach(function (product) {
                data.total_result.forEach(function (history) {
                  if (product.name === history.name) {
                    product.click_count = history.click_count;
                    product.ip_count = history.ip_count;
                  }
      
                  data.yestoday_result.forEach(function (yestoday) {
                    if (product.name === yestoday.name) {
                      product.yestoday_click_count = yestoday.click_count;
                      product.yestoday_ip_count = yestoday.ip_count;
                    }
                  })
                })
              })
            }, function (err) {
              console.log(err);
            });
          };

        $scope.productList(function () {
            $scope.product_history_list();
        });
    }]);
