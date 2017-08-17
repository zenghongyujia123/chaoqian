'use strict';

var cSite = angular.module('chaoQianSite', [
  'ui.router',
  //   'LocalStorageModule',
  //   'base64',
  'ngMaterial'
]);

cSite.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
    .warnPalette('red');
});

cSite.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/c_backend/site_admin/templates/home.client.view.html',
      controller: 'HomeController'
    });

  $urlRouterProvider.otherwise('/home');
}]);


/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('HomeController', [
    '$rootScope', '$scope', '$state', '$stateParams',
    function ($rootScope, $scope, $state, $stateParams) {

    }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('IndexController', [
    '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
    function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }
    }]);
