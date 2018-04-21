cSite.controller('UserListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork) {
    $scope.goDetail = function (user) {
      $state.go('user_detail', { user_id: user._id });
    }

    /*
        function removeByValue(arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i].vip_payed === val) {
              arr.splice(i, 1);
            }
          }
        }
     */
    $scope.user_list = [];


    $scope.userList = function () {
      //   $scope.user_list = [];
      UserNetwork.userList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user_list = data;
          /*          
                    if(par===2){
                      alert(par);
                      data.map(function(value,index,array){
                        if (value.vip_payed){
                          array.splice(index, value.length);
                          //delete(value);
                        }              
                      });
                      alert(JSON.stringify(data));
                      $scope.user_list = data;
                    }
                    else if(par===1)
                    {
                      
                      //removeByValue(data,false);
                      alert(par);
                      data.map(function(value,index,array){
                        if ((!value.vip_payed)||typeof(value.vip_payed)=="undefined"){
                          array.splice(index, 1);
                          //delete(value);              
                        }              
                      });
                      alert(JSON.stringify(data));
                     // $scope.user_list = data;
                    }
                    else{
                      alert(par);
                      $scope.user_list = data;
                    }
          */

        }
      }, function (err) {
        console.log(err);
      });
    };
    var userListByCondition = function (condition, sort) {

      UserNetwork.userListByCondition($scope, { 'condition': condition, 'sort': sort }).then(function (data) {
        $scope.user_list = data;
      });
    }

    $scope.all = function () {
      $scope.user_list = [];
      $scope.userList();
    }

    $scope.remove_non_vip = function () {
      $scope.user_list = [];

      userListByCondition({ 'vip_payed': true }, { 'username': 1 });

    }

    $scope.userListByConditionStatuses = function (statuses) {
      $scope.user_list = [];
      userListByCondition({ 'vip_status': { $in: statuses } }, { 'vip_payed_time': -1 });
    }


    $scope.vip_sort = function () {
      $scope.user_list = [];
      userListByCondition({ 'vip_payed': true }, { 'vip_payed_time': -1 });
    }

    $scope.getVipStatus = function (status) {
      var map = {
        'un_submit': {
          text: '未递交材料'
        },
        'submit': {
          text: '已递交材料'
        },
        'refuse': {
          text: '已拒绝'
        },
        'giveup': {
          text: '已放弃'
        },
        'daikuan': {
          text: '接受贷款'
        },
        'passed': {
          text: '审核通过'
        }
      }
      return map[status].text;
    }
  }]);

