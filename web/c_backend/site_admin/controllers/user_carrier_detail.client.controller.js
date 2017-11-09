/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserCarrierDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }

    function syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }

    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          if (data.carrier_detail) {
            data.carrier_detail = syntaxHighlight(JSON.parse(data.carrier_detail));
          }

          $scope.user = data;

          $('.id_carrier_detail').append(data.carrier_detail);
          $('.id_carrier_detail').html($('.id_carrier_detail').text());
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getUserById();


  }]);
