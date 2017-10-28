/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CreditPeopleListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'CreditPeopleNetwork',
  function ($rootScope, $scope, $state, $stateParams, CreditPeopleNetwork) {
    $scope.goDetail = function (id) {
      $state.go('credit_people_detail', { credit_people_id: id || '' });
    }
    $scope.credit_people_list = [];
    $scope.creditPeopleList = function () {
      CreditPeopleNetwork.creditPeopleList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.credit_people_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.creditPeopleList();
  }]);
