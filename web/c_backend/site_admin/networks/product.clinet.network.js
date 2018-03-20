'use strict';
cSite.factory('ProductNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateProduct: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product/updateProduct', params);
        },
        productList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product/productList', params);
        },
        productDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product/productDetail', params);
        },
        udpateProductFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product_filter/updateFilter', params);
        },
        getProductFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product_filter/getFilter', params);
        },
        updateJietiao: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/jietiao/updateJietiao', params);
        },
        jietiaoList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/jietiao/jietiaoList', params);
        },
        jietiaoDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/jietiao/jietiaoDetail', params);
        },
      };
    }]);
