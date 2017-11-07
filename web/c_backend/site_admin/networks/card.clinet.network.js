'use strict';
cSite.factory('CardNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateCard: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/card/updateCard', params);
        },
        cardList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/card/cardList', params);
        },
        cardDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/card/cardDetail', params);
        }

      };
    }]);
