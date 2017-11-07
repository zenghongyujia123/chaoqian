/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserDetailController', [
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
    $scope.product_list = [];
    $scope.select_product_list = [];

    $scope.card_list = [];
    $scope.select_card_list = [];

    $scope.productList = function () {
      ProductNetwork.productList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.product_list = data;
          $scope.user.vip_product_ids = $scope.user.vip_product_ids || [];

          $scope.user.vip_product_ids.forEach(function (pid) {
            $scope.select_product_list.push($scope.product_list.filter(function (p) {
              return p._id === pid;
            })[0]);
          });
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.cardList = function () {
      CardNetwork.cardList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.card_list = data;
          $scope.user.vip_card_ids = $scope.user.vip_card_ids || [];
          $scope.user.vip_card_ids.forEach(function (cid) {
            $scope.select_card_list.push($scope.card_list.filter(function (c) {
              return c._id === cid;
            })[0]);
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
          $scope.cardList();
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
      var index = -1;
      for (var i = 0; i < $scope.select_product_list.length; i++) {
        if ($scope.select_product_list[i]._id === product._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        $scope.select_product_list.push(product);
      }
    }

    $scope.removeProduct = function (product) {
      var index = -1;
      for (var i = 0; i < $scope.select_product_list.length; i++) {
        if ($scope.select_product_list[i]._id === product._id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        $scope.select_product_list.splice(index, 1);
      }
    }

    $scope.clickCard = function (card) {
      var index = -1;
      for (var i = 0; i < $scope.select_card_list.length; i++) {
        if ($scope.select_card_list[i]._id === card._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        $scope.select_card_list.push(card);
      }
    }

    $scope.removeCard = function (card) {
      var index = -1;
      for (var i = 0; i < $scope.select_card_list.length; i++) {
        if ($scope.select_card_list[i]._id === card._id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        $scope.select_card_list.splice(index, 1);
      }
    }

    $scope.updateVipInfo = function () {
      var productids = $scope.select_product_list.map(function (product) {
        return product._id;
      });
      var cardids = $scope.select_card_list.map(function (card) {
        return card._id;
      });


      UserNetwork.updateVipInfo($scope, {
        user_id: $stateParams.user_id, vip_info: {
          vip_report_url_text: $scope.user.vip_report_url_text,
          vip_product_ids: productids,
          vip_card_ids: cardids,
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
