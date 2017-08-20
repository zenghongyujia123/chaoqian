/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductListController', [
    '$rootScope', '$scope', '$state', '$stateParams', 'ProductNetwork',
    function ($rootScope, $scope, $state, $stateParams, ProductNetwork) {
        $scope.goDetail = function (id) {
            $state.go('product_detail', { product_id: id||'' });
        }
        $scope.product_list = [];
        $scope.productList = function () {
            ProductNetwork.productList($scope, {}).then(function (data) {
                console.log(data);
                if (!data.err) {
                    $scope.product_list = data;
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.productList();
    }]);
