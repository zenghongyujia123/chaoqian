'use strict';
cSite.factory('RecordNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateRecord: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business/updateRecord', params);
        },
        recordList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business/recordList', params);
        },
        recordDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business/recordDetail', params);
        },
        udpateRecordFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business_filter/udpateFilter', params);
        },
        getRecordFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/customer_business_filter/getFilter', params);
        },


      };
    }]);
