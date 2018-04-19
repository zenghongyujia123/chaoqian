'use strict';
cSite.factory('PostCodeNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        create_postcode: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/postcode/create_postcode', params);
        },
        list: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/postcode/list', params);
        }
      };
    }]);
