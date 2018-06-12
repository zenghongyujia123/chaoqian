'use strict';
cSite.factory('AgentNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        list_agent: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/agent/list_agent', params);
        },
        update_agent: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/agent/update_agent', params);
        },
        detail_agent: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/agent/detail_agent', params);
        },
        list_history: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/agent/list_history', params);
        }
      };
    }]);
