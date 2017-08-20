'use strict';

cSite.factory('CommonHelper', ['$rootScope', '$timeout', 'GlobalEvent', 'AddressConstant', '$mdDialog',
    function ($rootScope, $timeout, GlobalEvent, AddressConstant, $mdDialog) {
        // showMaterialReviewMap: function (scope, targetEvent, params, callback) {
        //   $mdDialog.show({
        //     controller: 'MaterialDialogReviewMapController',
        //     templateUrl: '/site_common/dialog/review_map/review_map.client.view.html',
        //     contentElement: document.querySelector('#myStaticDialog'),
        //     parent: angular.element(document.body),
        //     targetEvent: targetEvent,
        //     locals: params || {},
        //     scope: params.scope,
        //     preserveScope: true,
        //     clickOutsideToClose: false,
        //     fullscreen: scope.customFullscreen // Only for -xs, -sm breakpoints.
        //   }).then(callback);
        var commonHelper = {
            showLoading: function (scope, isShow) {
                $timeout(function () {
                    return scope.$emit(GlobalEvent.onShowLoading, isShow);
                }, 0);
            }
        };
        return commonHelper;
    }]);
