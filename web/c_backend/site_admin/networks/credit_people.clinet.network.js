'use strict';
cSite.factory('CreditPeopleNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateCreditPeople: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/credit_people/updateCreditPeople', params);
        },
        creditPeopleList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/credit_people/creditPeopleList', params);
        },
        creditPeopleDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/credit_people/creditPeopleDetail', params);
        }
      };
    }]);
