'use strict';
cSite.factory('UserNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        userList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/userList', params);
        },
        getUserById: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/getUserById', params);
        },
        verifyVip: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/verifyVip', params);
        }
      };
    }]);
