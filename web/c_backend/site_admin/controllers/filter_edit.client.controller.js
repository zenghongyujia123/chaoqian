/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('FilterEditController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'ProductNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, ProductNetwork, CommonHelper) {
    $scope.filter_strings = {
      brain_sort_string: '',
      loan_limit_string: '',
      working_identity_string: '',
      personal_natural_string: '',
      cycle_time_string: '',
      loan_term_string: ''
    };

    $scope.splitFilters = splitFilters;

    function splitFilters(str) {
      var filters = str.split(',');
      if (filters.length == 1 && filters[0] == '') {
        filters = [];
      }
      return filters
    }

    function getProductFilter() {
      ProductNetwork.getProductFilter($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.filter_strings.brain_sort_string = data.brain_sort.join(',');
          $scope.filter_strings.loan_limit_string = data.loan_limit.join(',');
          $scope.filter_strings.working_identity_string = data.working_identity.join(',');
          $scope.filter_strings.personal_natural_string = data.personal_natural.join(',');
          $scope.filter_strings.cycle_time_string = data.cycle_time.join(',');
          $scope.filter_strings.loan_term_string = data.loan_term.join(',');
        }
      });
    }

    $scope.udpateProductFilter = function () {
      var filter_info = {
        brain_sort: splitFilters($scope.filter_strings.brain_sort_string),
        loan_limit: splitFilters($scope.filter_strings.loan_limit_string),
        working_identity: splitFilters($scope.filter_strings.working_identity_string),
        personal_natural: splitFilters($scope.filter_strings.personal_natural_string),
        cycle_time: splitFilters($scope.filter_strings.cycle_time_string),
        loan_term: splitFilters($scope.filter_strings.loan_term_string)
      };

      ProductNetwork.udpateProductFilter($scope, { filter_info: filter_info }).then(function (data) {
        if (!data.err) {
          getProductFilter();
        }
      });
    }



    getProductFilter();
  }]);
