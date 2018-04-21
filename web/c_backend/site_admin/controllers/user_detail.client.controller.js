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
          $scope.user = data;
          $scope.productList();
          $scope.cardList();
          $scope.selectedAgent_rate = $scope.user.agent_rate;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.agent_rate = ['一般代理', '晋级代理', 'S级代理'];
    $scope.vip_rate = ['VIP会员', '非VIP会员'];

    $scope.verifyVip = function () {
      UserNetwork.verifyVip($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }

    $scope.goNotifyPassed = function () {
      //$state.go('user_vip_report', { user_id: $stateParams.user_id }, { reload: true });
      //alert('test button !')

      var username = '';
      var apikey = '1c18748ca1c51add4fcde413188c68b0';
      // var x = document.getElementById("verify_button");

      // 指定发送模板的内容
      //【京呗互联】尊敬的#name#，您的VIP征资报告已经出具完毕，请进入软件内查看。
      var tpl_value = "#name#=";
      tpl_value += '客户';

      var user_test = $scope.user;
      //alert(JSON.stringify(user_test));

      //username = $scope.user.real_phone;
      username = $scope.user.username;
      if (username.length != 11) {
        return alert('这个用户手机号不正确！');
      }
      $.ajax({
        url: 'https://sms.yunpian.com/v2/sms/tpl_single_send.json',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        port: 443,
        data: {
          'apikey': '1c18748ca1c51add4fcde413188c68b0',
          'mobile': username,
          'tpl_id': '2117718',
          'tpl_value': tpl_value,
        },
        complete: function (XMLHttpRequest, textStatus) {
          return alert('发送成功 !');
          //  x.innerHTML = "重新发送";
        },
        //error: erryFunction,  //错误执行方法    
        //success: succFunction, //成功执行方法
      });


      //    alert('随机码：' +  send_verify_code);

    }
    $scope.goReport = function () {
      $state.go('user_vip_report', { user_id: $stateParams.user_id }, { reload: true });
    }

    $scope.goCarrier = function () {
      $state.go('user_carrier_detail', { user_id: $stateParams.user_id }, { reload: true });
    }

    $scope.goPbc = function () {
      $state.go('user_pbc_detail', { user_id: $stateParams.user_id }, { reload: true });
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
          vip_credit_assessment: $scope.user.vip_credit_assessment,
          str1: $scope.user.str1,
          str2: $scope.user.str2,
          str3: $scope.user.str3,
          str4: $scope.user.str4,
          str5: $scope.user.str5,
          str6: $scope.user.str6,
          str7: $scope.user.str7,
          str8: $scope.user.str8,
          str9: $scope.user.str9,
          str10: $scope.user.str10,
          str11: $scope.user.str11,
          str12: $scope.user.str12,
          str13: $scope.user.str13,
          remark1: $scope.user.remark1,
          remark2: $scope.user.remark2,
          remark3: $scope.user.remark3,
          //          agent_rate: $scope.selectedAgent_rate
        }
      }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }

    $scope.rollback_vip_infos = function () {
      UserNetwork.rollback_vip_infos($scope, {
        user_id: $stateParams.user_id,
      }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }

    $scope.update_vip_status = function (status) {
      UserNetwork.update_vip_status($scope, {
        user_id: $stateParams.user_id,
        status: status
      }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }

    $scope.updateAgentRate = function () {
      UserNetwork.updateAgentRate($scope, {
        user_id: $stateParams.user_id, vip_info: {
          agent_rate: $scope.selectedAgent_rate
        }
      }).then(function (data) {

        //      alert(JSON.stringify(data));
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
      }
      return map[status].text;
    }
    $scope.getUserById();


  }]);

