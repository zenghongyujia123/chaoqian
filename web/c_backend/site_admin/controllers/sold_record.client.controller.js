
cSite.controller('soldRecordController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'SoldRecordNetwork', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, SoldRecordNetwork, UserNetwork) {
    $scope.goDetail = function (user_id, sold_record_id) {
      $state.go('sold_record_detail', { user_id: user_id, sold_record_id: sold_record_id });
    }
    var soldRecordListByCondition = function (condition, sort) {

      SoldRecordNetwork.soldRecordListByCondition($scope, { 'condition': condition, 'sort': sort }).then(function (data) {
        // $scope.user_list = data;
      });
    }
    //record_by_username
    $scope.record_by_username = function () {

      $scope.sold_record_list = [];
      var username = prompt("请输入要查找的用户手机号：", "");

      if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(username))) {
        return alert("请确认号码是否正确！");
      }
      var condition = { 'user_phone': username };
      var sort = { 'user_phone': 1 };
      SoldRecordNetwork.soldRecordListByCondition($scope, { 'condition': condition, 'sort': sort }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.sold_record_list = data;
          //             alert(JSON.stringify(data));
        }
      }, function (err) {
        console.log(err);
      });
    }
    var user = {};
    var getUserById = function (user_id) {
      UserNetwork.getUserById($scope, { user_id: user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          user = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.VIP_sold_record = function () {
      //        alert('vip sold');
      $scope.sold_record_list = [];
      SoldRecordNetwork.vip69SoldList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.sold_record_list = data;

        }
      }, function (err) {
        console.log(err);
      });

    }

    $scope.Credit198_sold_record = function () {
      //        alert('credit198 sold');
      $scope.sold_record_list = [];
      SoldRecordNetwork.credit198SoldList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.sold_record_list = data;
          //             alert(JSON.stringify(data));
        }
      }, function (err) {
        console.log(err);
      });

    }

    $scope.All = function () {

      $scope.sold_record_list = [];
      SoldRecordNetwork.soldRecordList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.sold_record_list = data;
          //             alert(JSON.stringify(data));
        }
      }, function (err) {
        console.log(err);
      });


    }

    $scope.soldRecordListByCondition = function (type) {
      $scope.sold_record_list = [];
      SoldRecordNetwork.soldRecordListByCondition($scope, { 'condition': { type: type }, 'sort': { 'content.time_end': -1 } }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.sold_record_list = data;
          //             alert(JSON.stringify(data));
        }
      }, function (err) {
        console.log(err);
      });
    }
  }]);


