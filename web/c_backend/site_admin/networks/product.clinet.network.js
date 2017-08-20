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
      };
    }]);
