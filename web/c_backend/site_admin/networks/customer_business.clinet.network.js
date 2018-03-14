'use strict';
cSite.factory('CustomerBusinessNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        addRecord: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customerbusiness/addRecord', params);
        },
        recordList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customerbusiness/recordList', params);
        },
        recordDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customerbusiness/recordDetail', params);
        },
        udpateCustomerBusinessFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business_filter/updateFilter', params);
        },
        getCustomerBusinessFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business_filter/getFilter', params);
        }
      };
    }]);
