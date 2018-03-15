cSite.controller('UserVipReportController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user = data;
          $scope.user.vip_report = $scope.user.vip_report || {};
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.updateVipReportInfo = function () {
      UserNetwork.updateVipReportInfo($scope, {
        user_id: $stateParams.user_id, vip_report: $scope.user.vip_report
      }).then(function (data) {
        console.log(data);
        $state.go('user_vip_detail', null, { reload: true });
      });
    }
    $scope.getUserById();
  }]);

