/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
var jietiaoLogic = require('../logics/jietiao');
var cardLogic = require('../logics/card');
var smsLib = require('../../libraries/sms');


var cblogic = require('../logics/customer_business');
var userLogic = require('../logics/user');
var postcodeLogic = require('../logics/postcode');
var thirdQueryLogic = require('../logics/third_query');
var creditPeopleLogic = require('../logics/credit_people');
var productFilterloigc = require('../logics/product_filter');
var provinces = require('../constants/city');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();


function getUserAccessToken(code, callback) {
  agent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf567e44e19240ae3&secret=fe0fad0d4eb9cedec995dbea06bd2f3b&code=' + code + '&grant_type=authorization_code ')
    .end(function (err, result) {
      console.log(' code err-----');
      console.log(err);
      console.log('code  result-----');
      console.log(result.text);
      result = JSON.parse(result.text);
      access_token = result.access_token;
      console.log('user_access_token : ', access_token);
      callback(err, result);
    });
}


exports.home = function (req, res, next) {
  getUserAccessToken(req.query.code, function (err, result) {
    if (result.openid) {
      cookieLib.setCookie(res, 'openid', result.openid);
      cookieLib.setCookie(res, 'user_access_token', result.access_token);
    }

    var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
    req.cookies.city = req.params.city || req.cookies.city || '';
    cookieLib.setCookie(res, 'city', req.cookies.city);
    cookieLib.setCookie(res, 'device', req.query.device);
    return res.render(filepath, { city: req.cookies.city, device: req.query.device || '' });
  });
};

exports.paycredit = function (req, res, next) {

  var filepath = path.join(__dirname, '../../web/c_wechat/views/paycredit.client.view.html');
  return res.render(filepath, { city: req.cookies.city });

};

exports.result = function (req, res, next) {
  var user = req.user;
  var xinyongs = [
    {
      text: '差',
      value: '2500元',
      codes: [
        '3113', '3114', '3123', '3124', '3133', '3134', '3143', '3144',
        '3213', '3214', '3313', '3314', '3413', '3414', '4114', '4123',
        '4124', '4133', '4134', '4143', '4144', '4213', '4214', '4313',
        '4314', '4413', '4414', '4113'
      ],
      risk_codes: [
        'G2', 'M1'
      ]
    },
    {
      text: '一般',
      value: '5000元',
      codes: [
        '3233', '3234', '3243', '3244', '3323', '3324', '3343', '3344', '3423',
        '3424', '4233', '4234', '4243', '4244', '4323', '4324', '4333', '4334',
        '4343', '4423', '4424'
      ],
      risk_codes: [
        'Z2', 'Z3', 'G1', 'G2'
      ]
    },

    {
      text: '差',
      value: '3500元',
      codes: [
        '3223', '3224', '4223', '4224'
      ],
      risk_codes: [
        'G2', 'M1'
      ]
    },

    {
      text: '差',
      value: '1000元',
      codes: [
        '3333', '3334'
      ],
      risk_codes: [
        'M2', 'M3'
      ]
    },

    {
      text: '较好',
      value: '7000元',
      codes: [
        '3433', '3443', '4344', '4433'
      ],
      risk_codes: [
        'Z2', 'Z3', 'G1', 'G2', 'M1', 'M2', 'M3', 'GQ'
      ]
    },

    {
      text: '很好',
      value: '10000元',
      codes: [
        '3434', '4434'
      ],
      risk_codes: [
        'Z1', 'Z2', 'Z3', 'G1', 'G2', 'M1', 'M2', 'M3', 'GQ'
      ]
    },
    {
      text: '非常好',
      value: '20000元',
      codes: [
        '3444', '4443', '4444'
      ],
      risk_codes: [
        'Y1', 'Y2', 'Y3', 'Z1', 'Z2', 'Z3', 'G1', 'G2', 'M1', 'M2', 'M3', 'GQ'
      ]
    }
  ];


  var result = null;
  xinyongs.forEach(function (item) {
    if (item.codes.indexOf(req.query.code) >= 0) {
      result = item;
    }
  });


  productLogic.productsByRiskCode(result.risk_codes, function (err, products) {
    cardLogic.cardList(function (err, cards) {
      var filepath = path.join(__dirname, '../../web/c_wechat/views/question_result.client.view.html');
      return res.render(filepath, {
        city: req.cookies.city || '',
        text: result.text || '',
        price: result.value || '',
        products: products || [],
        cards: cards || []
      });
    });
  });
};

exports.page_query_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_query_list.client.view.html');
  return res.render(filepath, {});
};

exports.page_query_create = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_query_create.client.view.html');
  return res.render(filepath, { type: req.query.type });
};

exports.page_query_create_result = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_query_create_result.client.view.html');
  return res.render(filepath, {});
};

exports.page_query_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_query_main.client.view.html');
  return res.render(filepath, {});
};

exports.product_detail = function (req, res, next) {
  var product = req.product || {};
  var filepath = path.join(__dirname, '../../web/c_wechat/views/product_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city, product: product });
};

exports.question = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/question.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.me = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: user });
};

exports.signin = function (req, res, next) {
  var openid = req.cookies.openid;
  console.log('openid ,', openid);
  var filepath = path.join(__dirname, '../../web/c_wechat/views/signin.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.signup = function (req, res, next) {
  var code = req.query.code || '';
  var filepath = path.join(__dirname, '../../web/c_wechat/views/signup.client.view.html');
  return res.render(filepath, { city: req.cookies.city, code: code });
};

exports.me_info = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_info.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_business = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_business.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_vip = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_vip.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};


exports.me_account = function (req, res, next) {
  var user = req.user;
  userLogic.user_pays(req.user, function (err, results) {
    if (err) {
      return res.send(err);
    }
    var filepath = path.join(__dirname, '../../web/c_wechat/views/me_account.client.view.html');
    return res.render(filepath, { city: req.cookies.city, user: req.user, pays: results });
  });
};

exports.me_bill = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_bill.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.me_agent = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_agent.client.view.html');

  userLogic.getUserShareUrl(user.username, function (err, url_info) {
    return res.render(filepath, { city: req.cookies.city, user: req.user, url_info: url_info || {} });
  })
};

exports.me_query = function (req, res, next) {
  var user = req.user;

  thirdQueryLogic.get_query_by_list(req.user, { user_id: user._id }, function (err, result) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/me_query.client.view.html');
    return res.render(filepath, { list: result });
  });
};

exports.postcode_my_list = function (req, res, next) {
  var user = req.user;
  postcodeLogic.list(req.user, { user_id: user._id }, function (err, result) {
    console.log(result);
    var filepath = path.join(__dirname, '../../web/c_wechat/views/postcode_my_list.client.view.html');
    return res.render(filepath, { list: result });
  });
};

exports.postcode_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/postcode_detail.client.view.html');
  return res.render(filepath, { number: req.query.number });
};



exports.me_query_detail = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_query_detail.client.view.html');
  if (req.third_query.type === '大') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/me_query_detail_miguan.client.view.html');
  }
  if (req.third_query.type === '黑') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/me_query_detail_hei.client.view.html');
  }
  if (req.third_query.type === '介') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/me_query_detail_jie.client.view.html');
  }


  return res.render(filepath, { third_query: req.third_query, data: req.third_query.result.result.data, });
};

exports.me_achievement = function (req, res, next) {
  var user = req.user;

  var as_parent_record_list = [];
  var as_topparent_record_list = [];
  var sum1_parent_loan_award = 0;
  var sum1_parent_credit_award = 0;
  var sum1_parent_pos_award = 0;
  var sum1_parent_vip_award = 0;
  var sum1_parent_money4agent_award = 0;
  var sum1_parent_money4Sagent_award = 0;
  var sum1_parent_car_mgr_award = 0;
  var sum1_parent_help4credit_award = 0;
  var sum1_parent_help4card_award = 0;

  var sum1_topparent_loan_award = 0;
  var sum1_topparent_credit_award = 0;
  var sum1_topparent_pos_award = 0;
  var sum1_topparent_vip_award = 0;
  var sum1_topparent_money4agent_award = 0;
  var sum1_topparent_money4Sagent_award = 0;
  var sum1_topparent_car_mgr_award = 0;
  var sum1_topparent_help4credit_award = 0;
  var sum1_topparent_help4card_award = 0;

  var get_award = function (username) {

    var current_date = new Date();
    var ss = current_date.getMonth() + 1;
    var mm_s = '2018,' + ss + ',2';
    var start = new Date(mm_s);
    var end = current_date;
    var target_name = '';

    username = username.replace(/[\r\n]/g, "");
    username = username.replace(/[ ]/g, "");
    var query_s = { 'parent_name': username, "record_date": { $gte: start, $lte: end } };
    //  alert('top_parent:'+top_parent);
    cblogic.recordList(query_s, function (err, data) {
      as_parent_record_list = data;

      // need to modify later , if the requirement is clear 

      as_parent_record_list.map(function (value, index, array) {
        sum1_parent_loan_award += array[index].parent_loan_award;
        sum1_parent_credit_award += array[index].parent_credit_award;
        sum1_parent_pos_award += array[index].parent_pos_award;
        sum1_parent_vip_award += array[index].parent_vip_award;
        sum1_parent_money4agent_award += array[index].parent_money4agent_award;
        sum1_parent_money4Sagent_award += array[index].parent_money4Sagent_award;
        sum1_parent_car_mgr_award += array[index].parent_car_mgr_award;
        sum1_parent_help4credit_award += array[index].parent_help4credit_award;
        sum1_parent_help4card_award += array[index].parent_help4card_award;
        target_name = as_parent_record_list[0].target_user.slice(-4);
      });
      console.log(sum1_parent_loan_award);


      //topparent tj
      var query_s = { 'topparent_name': username, "record_date": { $gte: start, $lte: end } };
      cblogic.recordList(query_s, function (err, data) {

        as_topparent_record_list = data;
        as_topparent_record_list.map(function (value, index, array) {
          sum1_topparent_loan_award += array[index].topparent_loan_award;
          sum1_topparent_credit_award += array[index].topparent_credit_award;
          sum1_topparent_pos_award += array[index].topparent_pos_award;
          sum1_topparent_vip_award += array[index].topparent_vip_award;
          sum1_topparent_money4agent_award += array[index].topparent_money4agent_award;
          sum1_topparent_money4Sagent_award += array[index].topparent_money4Sagent_award;
          sum1_topparent_car_mgr_award += array[index].topparent_car_mgr_award;
          sum1_topparent_help4credit_award += array[index].topparent_help4credit_award;
          sum1_topparent_help4card_award += array[index].topparent_help4card_award;
        });
        console.log(sum1_topparent_loan_award);
      });
      var filepath = path.join(__dirname, '../../web/c_wechat/views/me_achievement.client.view.html');
      var records = {
        'loan_award': 0,
        'credit_award': 0,
        'pos_award': 0,
        'vip_award': 0,
        'money4agent_award': 0,
        'money4Sagent_award': 0,
        'car_mgr_award': 0,
        'help4credit_award': 0,
        'help4card_award': 0,
        'record_date': ss,
        'username': ''
      };
      records.loan_award = (sum1_parent_loan_award + sum1_topparent_loan_award).toFixed(1);
      records.credit_award = (sum1_parent_credit_award + sum1_topparent_credit_award).toFixed(1);
      records.pos_award = (sum1_parent_pos_award + sum1_topparent_pos_award).toFixed(1);
      records.vip_award = (sum1_parent_vip_award + sum1_topparent_vip_award).toFixed(1);
      records.money4agent_award = (sum1_parent_money4agent_award + sum1_topparent_money4agent_award).toFixed(1);
      records.money4Sagent_award = (sum1_parent_money4Sagent_award + sum1_topparent_money4Sagent_award).toFixed(1);
      records.car_mgr_award = (sum1_parent_car_mgr_award + sum1_topparent_car_mgr_award).toFixed(1);
      records.help4credit_award = (sum1_parent_help4credit_award + sum1_topparent_help4credit_award).toFixed(1);
      records.help4card_award = (sum1_parent_help4card_award + sum1_topparent_help4card_award).toFixed(1);
      // get_award(user.username);
      records.username = target_name;
      records.record_date = ss;
      return res.render(filepath, { city: req.cookies.city, user: req.user, record: records });

    });

  }

  get_award(user.username);

};


exports.apply_third = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/apply_third.client.view.html');
  // return res.render(filepath, { city: req.cookies.city });
  return res.redirect('https://www.baidu.com');
};


exports.card_list = function (req, res, next) {

  var title = {
    'int1': '新手办卡',
    'int2': '高额取现',
    'int3': '网购精选',
    'int4': '商务旅游',
  }

  var user = req.user;
  var query = {};
  if (req.query.key)
    query[req.query.key] = 1;
  cardLogic.cardListByTag(query, function (err, cards) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/card_list.client.view.html');
    return res.render(filepath, { city: req.cookies.city, user: user, cards: cards, title: title[req.query.key] });
  });
};

exports.card_detail = function (req, res, next) {
  var card = req.card;
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: user, card: card });
};

exports.card_home = function (req, res, next) {
  var user = req.user;
  cardLogic.cardList(function (err, cards) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/card_home.client.view.html');
    return res.render(filepath, { city: req.cookies.city, user: user, cards: cards });
  });

};

exports.card_progress = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_progress.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.self_home = function (req, res, next) {
  var info = {
    query_key: req.query.query_key,
    query_value: req.query.query_value,
    sort_key: req.query.sort_key,
    sort_value: req.query.sort_value,
  };
  productLogic.productList(info, function (err, products) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_home.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      products: products || [],
      cur_filter: info.query_key || info.sort_key || '',
      device: req.cookies.device || ''
    });
  });
};


exports.self_jietiao = function (req, res, next) {
  jietiaoLogic.jietiaoList({}, function (err, results) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_jietiao.client.view.html');
    return res.render(filepath, {
      jietiaos: results || []
    });
  });
};


exports.self_local = function (req, res, next) {
  var user = req.user;
  if (user.location) {
    console.log('user.location');
    creditPeopleLogic.nearCreditPeopleList(user.location, function (err, credit_people_list) {
      console.log(credit_people_list);
      var filepath = path.join(__dirname, '../../web/c_wechat/views/self_local.client.view.html');
      return res.render(filepath, {
        city: req.cookies.city || '',
        credit_people_list: credit_people_list || []
      });
    });
  }
  else {
    console.log('user. not location');
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_local.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      credit_people_list: []
    });
  }
};

exports.banner = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/banner.client.view.html');
  return res.render(filepath, { img: req.query.img });
};


exports.credit_people_detail = function (req, res, next) {
  var credit_people = req.credit_people;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/credit_people_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city, credit_people: credit_people });
};

exports.vip_base_info = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_base_info.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_auth_info = function (req, res, next) {
  var user = req.user;
  if (!user.has_read_vip_notice) {
    userLogic.updateVipNotice(user, function (err, result) {
    });
  }
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_1.client.view.html');

  if (user.vip_payed) {
    filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_2.client.view.html');
  }

  if (user.vip_status === 'submit') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_3.client.view.html');
  }

  if (user.vip_status === 'passed') {
    productLogic.productListByIds(user.vip_product_ids, function (err, products) {
      cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
        filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result.client.view.html');
        return res.render(filepath, { city: req.cookies.city, user: user, products: products, cards: cards });
      });
    });
  }
  else if (user.vip_status === 'giveup' || user.vip_status === 'refuse') {
    productLogic.productListByIds(user.vip_product_ids, function (err, products) {
      return res.render(path.join(__dirname, '../../web/c_wechat/views/vip_result_refuse.client.view.html'), { city: req.cookies.city, user: user, products: products });
    });
  }
  else if (user.vip_status === 'daikuan') {
    productLogic.productListByIds(user.vip_product_ids, function (err, products) {
      cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
        filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result_feedback.client.view.html');
        return res.render(filepath, { city: req.cookies.city, user: user, products: products, cards: cards });
      });
    });
  }
  else {
    return res.render(filepath, { city: req.cookies.city, user: user });
  }
};

exports.vip_result = function (req, res, next) {
  var user = req.user;
  productLogic.productListByIds(user.vip_product_ids, function (err, products) {
    cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
      filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result.client.view.html');
      return res.render(filepath, { city: req.cookies.city, user: user, products: products, cards: cards });
    });
  });
};

exports.vip_result_feedback = function (req, res, next) {
  var user = req.user;
  userLogic.update_vip_status(user, 'daikuan', function () {
    cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
      smsLib.sendWoYaoJieKuan(user.username, function () { });
      filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result_feedback.client.view.html');
      return res.render(filepath, { city: req.cookies.city, user: user, cards: cards });
    });
  });
};

exports.vip_result_refuse = function (req, res, next) {
  var user = req.user;
  userLogic.update_vip_status(user, 'giveup', function () {
    productLogic.productListByIds(user.vip_product_ids, function (err, products) {
      filepath = path.join(__dirname, '../../web/c_wechat/views/vip_result_refuse.client.view.html');
      return res.render(filepath, { products: products, user: user });
    });
  });
  // productLogic.productListByIds(user.vip_product_ids, function (err, products) {
  //     cardLogic.cardListByIds(user.vip_card_ids, function (err, cards) {
  //     });
  //   });
};






exports.vip_auth_1 = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_1.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_auth_2 = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_2.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: user });
};

exports.vip_auth_3 = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_3.client.view.html');
  return res.render(filepath, { city: req.cookies.city, user: req.user });
};

exports.vip_notice = function (req, res, next) {
  var user = req.user;
  if (user.has_read_vip_notice && user.vip_payed) {
    return res.redirect('/page_wechat/vip_auth_info');
  }
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_notice.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_auth_report = function (req, res, next) {
  var user = req.user;
  var vip_report = user.vip_report || {};
  vip_report.str29s = vip_report.str29s || [];
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_report.client.view.html');
  return res.render(filepath, { city: req.cookies.city, vip_report: vip_report });
};


exports.invite_notice = function (req, res, next) {
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/invite_notice.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};


exports.page_image = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_image.client.view.html');
  return res.render(filepath, { url: req.query.url, title: req.query.title || '' });
};

exports.page_images = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_images.client.view.html');
  return res.render(filepath, { type: req.query.type, title: req.query.title || '' });
};


exports.page_contract_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_contract_list.client.view.html');
  return res.render(filepath, {
    list: [
      '平台服务协议',
      '借款协议',
      '委托扣款协议'
    ], title: req.query.title || ''
  });
};


exports.me_share = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me_share.client.view.html');
  return res.render(filepath, { city: req.cookies.city, code: (req.params.code || req.query.code || '') });
}

exports.page_reward = function (req, res, next) {
  var color = req.query.color;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/reward/page_reward.client.view.html');
  return res.render(filepath, { color: color || 'green' });
}

exports.page_refresh_reward = function (req, res, next) {
  var colors = ['green', 'orange', 'red', 'blue', 'purple'];
  var index = Math.floor(Math.random() * 5);
  var filepath = path.join(__dirname, '../../web/c_wechat/views/reward/page_reward.client.view.html');
  return res.render(filepath, { color: colors[index] });
}

