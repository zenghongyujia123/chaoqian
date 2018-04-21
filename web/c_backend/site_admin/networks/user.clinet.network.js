
'use strict';
cSite.factory('UserNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        userList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/userList', params);
        },
        ///user/userListByCondition
        userListByCondition: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/userListByCondition', params);
        },        
        getUserById: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/getUserById', params);
        },
        //getUserByUsername
        getUserByUsername: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/getUserByUsername', params);
        },
        verifyVip: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/verifyVip', params);
        },
        update_vip_status: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/update_vip_status', params);
        },
        updateVipInfo: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/updateVipInfo', params);
        },
//updateAgentRate  
        updateAgentRate: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/updateAgentRate', params);
        },
        updateVipReportInfo: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/updateVipReportInfo', params);
        },
        rollback_vip_infos: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/rollback_vip_infos', params);
        },
      };
    }]);
