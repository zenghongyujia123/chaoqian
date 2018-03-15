/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CreditPeopleDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'CreditPeopleNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, CreditPeopleNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $scope.credit_people.photo = QiniuService.getQiniuImageSrc(info.key);
      console.log('upload successs : ---- ', info);
    });

    $scope.credit_people = {
      _id: $stateParams.credit_people_id || '',
      name: '',
      phone: '',
      photo: '',
      tags: '',
      job_start_time: '',
      company_type: '',
      personal_description: '',
      business_description: '',
      location: [0, 0]
    };

    $scope.updateCreditPeople = function (event) {
      CreditPeopleNetwork.updateCreditPeople($scope, { credit_people_info: $scope.credit_people }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('credit_people_detail', { credit_people_id: data._id }, { reload: true });
          }, null, null, event);
        }


        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function creditPeopleDetail() {
      if ($scope.credit_people._id) {
        CreditPeopleNetwork.creditPeopleDetail($scope, { credit_people_id: $scope.credit_people._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.credit_people = data;
            if (!data.location) {
              $scope.credit_people.location = [0, 0];
            }
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    creditPeopleDetail();
  }]);
