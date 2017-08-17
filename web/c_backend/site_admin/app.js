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
    })
    .state('product', {
      url: '/product',
      templateUrl: '/c_backend/site_admin/templates/product.client.view.html',
      controller: 'ProductController'
    })
    .state('product_detail', {
      url: '/product_detail',
      templateUrl: '/c_backend/site_admin/templates/product_detail.client.view.html',
      controller: 'ProductDetailController'
    })
    ;
  $urlRouterProvider.otherwise('/home');
}]);

