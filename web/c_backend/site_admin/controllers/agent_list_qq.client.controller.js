/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('AgentListQQController', [
    '$rootScope', '$scope', '$state', '$stateParams', 'AgentNetwork',
    function ($rootScope, $scope, $state, $stateParams, AgentNetwork) {
        $scope.goDetail = function (item) {
            item = item||{};
            $state.go('agent_detail_qq', { detail_id: item._id || '' });
        }
        $scope.list = [];
        $scope.list_agent = function () {
            AgentNetwork.list_agent($scope, {type:'qq_agent'}).then(function (data) {
                console.log(data);
                if (!data.err) {
                    $scope.list = data;
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.list_agent();
    }]);
