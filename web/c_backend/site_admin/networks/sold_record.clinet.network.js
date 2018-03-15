
//SoldRecordNetwork
'use strict';
cSite.factory('SoldRecordNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        soldRecordList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/sold_record/soldRecordList', params);
        },
        vip69SoldList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/sold_record/vip69SoldList', params);
        },
        credit198SoldList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/sold_record/credit198SoldList', params);
        },
        //       soldRecordListByCondition:function
        soldRecordListByCondition: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/sold_record/soldRecordListByCondition', params);
        }
      };
    }]);