/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductListController', [
    '$rootScope', '$scope', '$state', '$stateParams',
    function ($rootScope, $scope, $state, $stateParams) {

        $scope.goDetail = function(id){
            $state.go('product_detail');
        }
    }]);
