/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductDetailController', [
    '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'ProductNetwork',
    function ($rootScope, $scope, $state, $stateParams, QiniuService, ProductNetwork) {
        var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
            console.log('upload successs : ---- ', info);
        });

        if (!$stateParams.product_id) {
            $scope.product = {
                _id: $stateParams.product_id,
                name: '',
                logo: '',
                description: '',
                min_limit: '',
                max_limit: '',
                refer_cost_per_day: '',
                longest_time: '',
                fee_info: '',
                apply_success_percent: '',
                apply_people_count: '',
                apply_info: '',
                other_info: '',
                apply_strategy: '',
                organization_info: ''
            };
        }

        $scope.updateProduct = function () {
            ProductNetwork.updateProduct($scope, { product_info: $scope.product }).then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });;
        }
    }]);
