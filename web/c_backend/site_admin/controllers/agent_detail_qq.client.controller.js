/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('AgentDetailQQController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'AgentNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, AgentNetwork, CommonHelper) {
    $scope.agent = {
      _id: $stateParams.detail_id,
      type: 'qq_agent',
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      str5: '',
      str6: '',
      str7: '',
      str8: '',
      str9: '',
      str10: '',
      str11: '',
    };

    $scope.update_agent = function (event) {
      AgentNetwork.update_agent($scope, $scope.agent).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('agent_detail_qq', { detail_id: data._id }, { reload: true });
          }, null, null, event);
        }
        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function detail_agent() {
      if ($scope.agent._id) {
        AgentNetwork.detail_agent($scope, { detail_id: $scope.agent._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.agent = data;
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    detail_agent();
  }]);
