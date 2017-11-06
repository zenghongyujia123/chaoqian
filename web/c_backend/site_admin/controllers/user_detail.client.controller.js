/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork) {
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
    $scope.product_list = [];
    $scope.productList = function () {
      ProductNetwork.productList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.product_list = data;
          $scope.user.vip_product_ids = $scope.user.vip_product_ids || [];
          $scope.product_list.forEach(function (product) {
            product.isSelect = $scope.user.vip_product_ids.indexOf(product._id) >= 0;
          });
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          if (data.carrier_detail) {
            data.carrier_detail = syntaxHighlight(JSON.parse(data.carrier_detail));
          }
          if (data.pbc_detail) {
            data.pbc_detail = syntaxHighlight(JSON.parse(data.pbc_detail));
          }
          $scope.user = data;

          $('.id_pbc_detail').append(data.pbc_detail);
          $('.id_pbc_detail').html($('.id_pbc_detail').text());

          $('.id_carrier_detail').append(data.carrier_detail);
          $('.id_carrier_detail').html($('.id_carrier_detail').text());

          $scope.productList();
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.verifyVip = function () {
      UserNetwork.verifyVip($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }

    $scope.clickProduct = function (product) {
      product.isSelect = !product.isSelect;
    }

    $scope.updateVipInfo = function () {
      var productids = $scope.product_list.filter(function (product) {
        return !!product.isSelect;
      }).map(function (product) {
        return product._id;
      });

      UserNetwork.updateVipInfo($scope, {
        user_id: $stateParams.user_id, vip_info: {
          vip_product_ids: productids,
          vip_credit_starter: $scope.user.vip_credit_starter,
          vip_credit_assessment: $scope.user.vip_credit_assessment
        }
      }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }
    $scope.getVipStatus = function (status) {
      var map = {
        'un_submit': {
          text: '未递交材料'
        },
        'submit': {
          text: '已递交材料'
        },
        'passed': {
          text: '审核通过'
        }
      }
      return map[status].text;
    }
    $scope.getUserById();


  }]);
