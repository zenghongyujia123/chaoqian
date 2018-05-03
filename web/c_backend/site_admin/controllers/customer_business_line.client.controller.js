cSite.controller('CustomerBusinessLineController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'RecordNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, RecordNetwork) {

    $scope.wait = 0;
    var current_date = new Date();
    $scope.current_date = current_date;//'2018.1.6';

    $scope.user = {};

    $scope.loan_num = 0;
    $scope.credit_num = 0;
    $scope.pos_num = 0;
    $scope.money4agent = 298;
    $scope.money4Sagent = 1099;
    $scope.car_mgr_num = 0;
    $scope.help4credit = 198;
    $scope.help4card = 0;

    var checkInputEmpty = function () {
      return ($scope.loan_num + $scope.credit_num + $scope.pos_num + $scope.money4agent + $scope.money4Sagent + $scope.car_mgr_num);

    };
    $scope.checkUser = function () {

      $scope.wait = 1;
      if (!$scope.customer_mobile) {
        return alert('请输入用户注册电话号码！');
      }
      else {
        //         alert($scope.customer_mobile);
      }

      $scope.user = {};
      $scope.firstParent = {};
      $scope.topParent = {};

      $scope.getUserByUsername = function () {
        UserNetwork.getUserByUsername($scope, { 'username': $scope.customer_mobile }).then(function (data) {

          if (!data.err) {
            //alert(JSON.stringify(data));
            $scope.user = data;
            //second layer start
            UserNetwork.getUserByUsername($scope, { 'username': $scope.user.parent }).then(function (data) {

              if (!data.err) {
                //alert(JSON.stringify(data));
                $scope.firstParent = data;
                //3 layer start

                UserNetwork.getUserByUsername($scope, { 'username': $scope.firstParent.parent }).then(function (data) {

                  if (!data.err) {
                    //alert(JSON.stringify(data));
                    $scope.topParent = data;
                  }
                }, function (err) {
                  console.log(err);
                });
                // 3 layer end
              }
            }, function (err) {
              console.log(err);
            });
            // second layer end  
          }
        }, function (err) {
          console.log(err);
        });
      };

      $scope.getUserByUsername();
    };
    $scope.agent_rate = ['一般代理', '晋级代理', 'S级代理'];
    $scope.vip_rate = ['VIP会员', '非VIP会员'];
    // 板块： 贷款业务奖励金	信用卡奖励金	POS返佣	VIP返佣	晋级代理返佣	S级代理商返佣	车管家返佣
    /***************************************************************/
    // 按返佣原则计算上线和上上线的返佣数据
    // 系数index  0:'一般推广',1:'晋级代理',2:'S级代理'
    var p_ratio = [

      {
        'loan': 0.005,
        'credit': 20,
        'pos': 0.0005,
        'vip': 6.9,
        'agent': 5.96,
        'sagent': 0,
        'car_mgr': 0.003,
        'help4credit': 6.9,
        'help4card': 0.0005
      }

      ,

      {
        'loan': 0.01,
        'credit': 50,
        'pos': 0.001,
        'vip': 2.76,
        'agent': 2.98,
        'sagent': 0,
        'car_mgr': 0.01,
        'help4credit': 2.76,
        'help4card': 0.001
      }

      ,

      {
        'loan': 0,
        'credit': 0,
        'pos': 0,
        'vip': 0,
        'agent': 0,
        'sagent': 0,
        'car_mgr': 0,
        'help4credit': 0,
        'help4card': 0
      }

    ];
    var tp_ratio = [

      {
        'loan': 0,
        'credit': 0,
        'pos': 0,
        'vip': 0,
        'agent': 0,
        'sagent': 0,
        'car_mgr': 0,
        'help4credit': 0,
        'help4card': 0
      }

      ,

      {
        'loan': 0,
        'credit': 0,
        'pos': 0.0001,
        'vip': 6.9,
        'agent': 10,
        'sagent': 0,
        'car_mgr': 0.003,
        'help4credit': 6.9,
        'help4card': 0.0002
      }

      ,

      {
        'loan': 0,
        'credit': 0,
        'pos': 0,
        'vip': 0,
        'agent': 0,
        'sagent': 0,
        'car_mgr': 0,
        'help4credit': 0,
        'help4card': 0
      }

    ];

    var get_index = function (agent_rate) {
      if (agent_rate == "S级代理") return 2;
      else if (agent_rate == "晋级代理") return 1;
      else return 0;

    };

    var get_val = function (basenum, ratio) {
      if (!ratio) return 0;
      else return (basenum / ratio).toFixed(1);
    };

    $scope.monthlyAward = function () {
      $state.go('monthlyAward', {});
    };

    $scope.calAward = function () {

      if (!$scope.customer_mobile) {
        return alert('请先查询再计算！');
      };
      if ($scope.wait != 1) {
        return alert('请先输入数据再计算！');
      };
      $scope.wait = 2;

      $scope.parent_loan_award = ($scope.loan_num * p_ratio[get_index($scope.firstParent.agent_rate)].loan).toFixed(1);
      $scope.parent_credit_award = ($scope.credit_num * p_ratio[get_index($scope.firstParent.agent_rate)].credit).toFixed(1);
      $scope.parent_pos_award = $scope.user.postcode_payed ? 25 : 0;// ($scope.pos_num * p_ratio[get_index($scope.firstParent.agent_rate)].pos).toFixed(1);
      $scope.parent_vip_award = $scope.user.vip_payed ? 25 : 0;// get_val((($scope.user.vip_payed) ? 69 : 0), p_ratio[get_index($scope.firstParent.agent_rate)].vip);
      $scope.parent_money4agent_award = get_val($scope.money4agent, p_ratio[get_index($scope.firstParent.agent_rate)].agent);
      $scope.parent_money4Sagent_award = get_val($scope.money4Sagent, p_ratio[get_index($scope.firstParent.agent_rate)].sagent);
      $scope.parent_car_mgr_award = ($scope.car_mgr_num * p_ratio[get_index($scope.firstParent.agent_rate)].car_mgr).toFixed(1);
      $scope.parent_help4credit_award = get_val($scope.help4credit, p_ratio[get_index($scope.firstParent.agent_rate)].help4credit);
      $scope.parent_help4card_award = ($scope.help4card * p_ratio[get_index($scope.firstParent.agent_rate)].help4card).toFixed(1);

      $scope.topparent_loan_award = ($scope.loan_num * tp_ratio[get_index($scope.topParent.agent_rate)].loan).toFixed(1);
      $scope.topparent_credit_award = ($scope.credit_num * tp_ratio[get_index($scope.topParent.agent_rate)].credit).toFixed(1);
      $scope.topparent_pos_award = ($scope.pos_num * tp_ratio[get_index($scope.topParent.agent_rate)].pos).toFixed(1);
      $scope.topparent_vip_award = get_val((($scope.user.vip_payed) ? 69 : 0), tp_ratio[get_index($scope.topParent.agent_rate)].vip);
      $scope.topparent_money4agent_award = get_val($scope.money4agent, tp_ratio[get_index($scope.topParent.agent_rate)].agent);
      $scope.topparent_money4Sagent_award = get_val($scope.money4Sagent, tp_ratio[get_index($scope.topParent.agent_rate)].sagent);
      $scope.topparent_car_mgr_award = ($scope.car_mgr_num * tp_ratio[get_index($scope.topParent.agent_rate)].car_mgr).toFixed(1);
      $scope.topparent_help4credit_award = get_val($scope.help4credit, tp_ratio[get_index($scope.topParent.agent_rate)].help4credit);
      $scope.topparent_help4card_award = ($scope.help4card * tp_ratio[get_index($scope.topParent.agent_rate)].help4card).toFixed(1);

    }
    /***************************************************************/

    //按键函数, 存储填写的record到customerbusiness 数据库

    $scope.saveRecord = function () {

      if ($scope.wait != 2) {
        return alert('请先输入并计算数据再存储 ！');
      };
      $scope.wait = 0;
      $scope.record =
        {
          _id: '',
          target_user: $scope.customer_mobile,
          target_user_real_name: $scope.user.real_name,
          record_date: $scope.current_date,
          target_user_agent_rate: $scope.user.agent_rate,
          parent_name: $scope.user.parent,
          topparent_name: $scope.firstParent.parent,
          loan_num: $scope.loan_num,
          credit_num: $scope.credit_num,
          pos_num: $scope.pos_num,
          money4agent: $scope.money4agent,
          money4Sagent: $scope.money4Sagent,
          car_mgr_num: $scope.car_mgr_num,
          help4credit: $scope.help4credit,
          help4card: $scope.help4card,

          parent_loan_award: $scope.parent_loan_award,
          parent_credit_award: $scope.parent_credit_award,
          parent_pos_award: $scope.parent_pos_award,
          parent_vip_award: $scope.parent_vip_award,
          parent_money4agent_award: $scope.parent_money4agent_award,
          parent_money4Sagent_award: $scope.parent_money4Sagent_award,
          parent_car_mgr_award: $scope.parent_car_mgr_award,
          parent_help4credit_award: $scope.parent_help4credit_award,
          parent_help4card_award: $scope.parent_help4card_award,
          topparent_loan_award: $scope.topparent_loan_award,
          topparent_credit_award: $scope.topparent_credit_award,
          topparent_pos_award: $scope.topparent_pos_award,
          topparent_vip_award: $scope.topparent_vip_award,
          topparent_money4agent_award: $scope.topparent_money4agent_award,
          topparent_money4Sagent_award: $scope.topparent_money4Sagent_award,
          topparent_car_mgr_award: $scope.topparent_car_mgr_award,
          topparent_help4credit_award: $scope.topparent_help4credit_award,
          topparent_help4card_award: $scope.topparent_help4card_award

        };
      RecordNetwork.updateRecord($scope, { record_info: $scope.record }).then(function (data) {
        if (!data.err) {
          $scope.wait = 1;
          alert('存储成功');
          $state.go('recordList', {});
        }
      }, function (err) {
        console.log(err);
      });

    };

    //showAllRecord , 跳转到新的页面
    $scope.showAllRecord = function () {
      $state.go('recordList', {});
    };

  }]);
