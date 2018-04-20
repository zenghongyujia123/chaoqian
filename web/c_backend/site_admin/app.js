'use strict';

var cSite = angular.module('chaoQianSite', [
  'ui.router',
  //   'LocalStorageModule',
  //   'base64',
  'ngMaterial',
  'textAngular'
]);

cSite.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
    .warnPalette('red');
});

cSite.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    // .state('home', {
    //   url: '/home',
    //   templateUrl: '/c_backend/site_admin/templates/home.client.view.html',
    //   controller: 'HomeController'
    // })
    .state('postcode_list', {
      url: '/postcode_list',
      templateUrl: '/c_backend/site_admin/templates/postcode_list.client.view.html',
      controller: 'PostCodeListController'
    })
    // .state('postcode_detail', {
    //   url: '/postcode_detail',
    //   templateUrl: '/c_backend/site_admin/templates/postcode_detail.client.view.html',
    //   controller: 'PostCodeDetailController'
    // })
    .state('product_list', {
      url: '/product_list',
      templateUrl: '/c_backend/site_admin/templates/product_list.client.view.html',
      controller: 'ProductListController'
    })
    .state('jietiao_list', {
      url: '/jietiao_list',
      templateUrl: '/c_backend/site_admin/templates/jietiao_list.client.view.html',
      controller: 'JietiaoListController'
    })
    .state('card_list', {
      url: '/card_list',
      templateUrl: '/c_backend/site_admin/templates/card_list.client.view.html',
      controller: 'CardListController'
    })
    .state('user_list', {
      url: '/user_list',
      templateUrl: '/c_backend/site_admin/templates/user_list.client.view.html',
      controller: 'UserListController'
    })
    .state('product_detail', {
      url: '/product_detail/:product_id',
      templateUrl: '/c_backend/site_admin/templates/product_detail.client.view.html',
      controller: 'ProductDetailController'
    })
    .state('jietiao_detail', {
      url: '/jietiao_detail/:jietiao_id',
      templateUrl: '/c_backend/site_admin/templates/jietiao_detail.client.view.html',
      controller: 'JietiaoDetailController'
    })
    .state('user_detail', {
      url: '/user_detail/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_detail.client.view.html',
      controller: 'UserDetailController'
    })
    .state('user_vip_report', {
      url: '/user_vip_report/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_vip_report.client.view.html',
      controller: 'UserVipReportController'
    })
    .state('user_carrier_detail', {
      url: '/user_carrier_detail/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_carrier_detail.client.view.html',
      controller: 'UserCarrierDetailController'
    })
    .state('user_pbc_detail', {
      url: '/user_pbc_detail/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_pbc_detail.client.view.html',
      controller: 'UserPbcDetailController'
    })
    .state('card_detail', {
      url: '/card_detail/:card_id',
      templateUrl: '/c_backend/site_admin/templates/card_detail.client.view.html',
      controller: 'CardDetailController'
    })
    .state('card_setting', {
      url: '/card_setting/',
      templateUrl: '/c_backend/site_admin/templates/card_setting.client.view.html',
      controller: 'CardSettingController'
    })
    .state('credit_people_list', {
      url: '/credit_people_list',
      templateUrl: '/c_backend/site_admin/templates/credit_people_list.client.view.html',
      controller: 'CreditPeopleListController'
    })
    .state('credit_people_detail', {
      url: '/credit_people_detail/:credit_people_id',
      templateUrl: '/c_backend/site_admin/templates/credit_people_detail.client.view.html',
      controller: 'CreditPeopleDetailController'
    })
    .state('filter_edit', {
      url: '/filter_edit',
      templateUrl: '/c_backend/site_admin/templates/filter_edit.client.view.html',
      controller: 'FilterEditController'
    })
    //customer_business_line Added by Vincent
    .state('customer_business_line', {
      url: '/customer_business_line',
      templateUrl: '/c_backend/site_admin/templates/customer_business_line.client.view.html',
      controller: 'CustomerBusinessLineController'
    })
    ///customer_business/recordList    
    .state('recordList', {
      url: '/recordList',
      templateUrl: '/c_backend/site_admin/templates/record_list.client.view.html',
      controller: 'RecordListController'
    })
    .state('monthlyAward', {
      url: '/monthlyAward',
      templateUrl: '/c_backend/site_admin/templates/monthlyaward.client.view.html',
      controller: 'MonthlyAwardController'
    })
    .state('sold_record', {
      url: '/sold_record',
      templateUrl: '/c_backend/site_admin/templates/sold_record_list.client.view.html',
      controller: 'soldRecordController'
    })
    .state('sold_record_detail', {
      url: '/sold_record_detail/:user_id/:sold_record_id',
      templateUrl: '/c_backend/site_admin/templates/sold_record_detail.client.view.html',
      controller: 'SoldRecordDetailController'
    });;

  $urlRouterProvider.otherwise('/product_list');
}]);

