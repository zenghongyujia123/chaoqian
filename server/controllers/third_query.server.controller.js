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
      thirdQueryLogic.insert_query_result(user, '网贷成功率','大', JSON.parse(result.text), function (err, result) {
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
      thirdQueryLogic.insert_query_result(user, '网贷灰黑行为','黑', JSON.parse(result.text), function (err, result) {
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
      thirdQueryLogic.insert_query_result(user, '网贷黑中介','介', JSON.parse(result.text), function (err, result) {
        if (err) {
          return res.send(err);
        }
        return res.send(result);
      });
    });
};