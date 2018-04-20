cSite.controller('SoldRecordDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }

    $scope.product_list = [];
    $scope.select_product_list = [];
    $scope.card_list = [];
    $scope.select_card_list = [];
    

    $scope.user = {};

    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user = data;
          $scope.productList();
          $scope.cardList();
          $scope.selectedAgent_rate=$scope.user.agent_rate;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getUserById();
  }]);

