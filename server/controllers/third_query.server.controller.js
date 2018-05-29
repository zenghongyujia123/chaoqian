/**
 * Created by zenghong on 2017/8/8.
 */
var thirdQueryLogic = require('./../logics/third_query');
var agent = require('superagent').agent();

exports.mi_guan_da_shu_ju = function (req, res, next) {
  var user = req.user;
  var name = req.body.name;
  var idCard = req.body.idCard;
  var phone = req.body.phone;
  var appkey = '9db219247ee29dea087b32d1f8faca05';

  agent.get('https://way.jd.com/juxinli/henypot4JD')
    .query({
      name: name,
      idCard: idCard,
      phone: phone,
      appkey: appkey
    })
    .end(function (err, result) {
      thirdQueryLogic.insert_query_result(user, '网贷成功率', '大', JSON.parse(result.text), function (err, result) {
        if (err) {
          return res.send(err);
        }
        return res.send(result);
      });
    });
};

//网贷黑灰行为查询
exports.ge_ren_hei_ming_dan = function (req, res, next) {
  var user = req.user;
  var idCard = req.body.idCard;
  var name = req.body.name;
  var bankCardNo = req.body.bankCardNo;
  var mobile = req.body.mobile;
  var appkey = '9db219247ee29dea087b32d1f8faca05';

  agent.get('https://way.jd.com/XinShu/compBQuery')
    .query({
      bankCardNo: bankCardNo,
      idCard: idCard,
      mobile: mobile,
      name: name,
      appkey: appkey
    })
    .end(function (err, result) {
      thirdQueryLogic.insert_query_result(user, '网贷灰黑行为', '黑', JSON.parse(result.text), function (err, result) {
        if (err) {
          return res.send(err);
        }
        return res.send(result);
      });
    });
};

//网贷黑中介查询
exports.hei_zhong_jie = function (req, res, next) {
  var user = req.user;
  var mobile = req.body.mobile;
  var appkey = '9db219247ee29dea087b32d1f8faca05';

  agent.get('https://way.jd.com/chengweixin/loan')
    .query({
      mobile: mobile,
      appkey: appkey
    })
    .end(function (err, result) {
      thirdQueryLogic.insert_query_result(user, '网贷黑中介', '介', JSON.parse(result.text), function (err, result) {
        if (err) {
          return res.send(err);
        }
        return res.send(result);
      });
    });
};

exports.shumei_duopingtai_jiedai = function (user) {
  agent.post('https://finance-api.fengkongcloud.com/v4/finance/multiloan')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .send({
      accessKey: 'Gx5FuZUZQMp7uE4mmxMI',
      data: {
        phone: user.username,
        deviceId: '',
        imei: '',
        idfa: '',
        name: user.real_name,
        prcid: user.id_card,
      }
    })
    .end(function (err, result) {
      console.log(result.body);
      console.log(JSON.parse(result.text));
      console.log('over');
    });
}
// exports.shumei_duopingtai_jiedai()
exports.shumei_hangye_guanzhu_mingdan = function (user) {
  agent.post('https://finance-api.fengkongcloud.com/v4/finance/overdue')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .send({
      accessKey: 'Gx5FuZUZQMp7uE4mmxMI',
      data: {
        phone: user.username,
        deviceId: '',
        imei: '',
        idfa: '',
        name: user.real_name,
        prcid: user.id_card,
      }
    })
    .end(function (err, result) {
      console.log(result.body);
      console.log(JSON.parse(result.text));
      console.log('over');
    });
}

// exports.shumei_hangye_guanzhu_mingdan();
exports.shumei_kexingdu_fenji_fuwu = function (user) {
  agent.post('https://finance-api.fengkongcloud.com/v1/finance/credible')
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .send({
      accessKey: 'Gx5FuZUZQMp7uE4mmxMI',
      data: {
        phone: user.username,
        deviceId: '',
        type: 'payday',
        imei: '',
        idfa: '',
        name: user.real_name,
        prcid: user.id_card,
      }
    })
    .end(function (err, result) {
      console.log(result.body);
      console.log(JSON.parse(result.text));
      console.log('over');
    });
}
// exports.shumei_kexingdu_fenji_fuwu();
var that = exports;
exports.execute_shumei_api = function (user, callback) {
  that.shumei_hangye_guanzhu_mingdan(user);
  that.shumei_kexingdu_fenji_fuwu(user);
  that.shumei_duopingtai_jiedai(user);
  // return callback();
}