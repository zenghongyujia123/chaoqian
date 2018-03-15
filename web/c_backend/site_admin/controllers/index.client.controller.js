'use strict';

cSite.controller('IndexController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav','AddressConstant',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav,AddressConstant) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    do{
        name=prompt("Please input password","");
      }while(name!=AddressConstant.password);

    $scope.goNav = function (nav) {
      $scope.toggleLeft();
      $state.go(nav);
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }]);