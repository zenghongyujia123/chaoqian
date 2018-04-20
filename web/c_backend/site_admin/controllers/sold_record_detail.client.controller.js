cSite.controller('SoldRecordDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork', 'SoldRecordNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork, SoldRecordNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }

    $scope.user = {};
    $scope.sold_record = {};

    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user = data;
          $scope.selectedAgent_rate = $scope.user.agent_rate;
        }
      }, function (err) {
        console.log(err);
      });
    };
    $scope.get_by_id = function () {
      SoldRecordNetwork.get_by_id($scope, { detail_id: $stateParams.sold_record_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.sold_record = data;
        }
      }, function (err) {
        console.log(err);
      });
    };
    $scope.update_sold_record = function () {
      SoldRecordNetwork.update_sold_record($scope, {
        detail_id: $stateParams.sold_record_id,
        admin_descript_1: $scope.sold_record.admin_descript_1
      }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $state.go('sold_record_detail', null, { reload: true });
        }
      }, function (err) {
        console.log(err);
      });
    };



    $scope.getUserById();
    $scope.get_by_id();
  }]);

