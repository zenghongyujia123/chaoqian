/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var productLogic = require('../logics/product');
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

      access_token = result.text.access_token;
      console.log('user_access_token : ', access_token);



      callback();
    });
}


exports.home = function (req, res, next) {
  getUserAccessToken(req.query.code, function (result) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
    req.cookies.city = req.params.city || req.cookies.city || '';
    cookieLib.setCookie(res, 'city', req.cookies.city);
    return res.render(filepath, { city: req.cookies.city });
  })
};

exports.result = function (req, res, next) {
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
    var filepath = path.join(__dirname, '../../web/c_wechat/views/result.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      text: result.text || '',
      price: result.value || '',
      products: products || []
    });
  });
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
  var filepath = path.join(__dirname, '../../web/c_wechat/views/me.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.signin = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/signin.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.signup = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/signup.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
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

exports.apply_third = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/apply_third.client.view.html');
  // return res.render(filepath, { city: req.cookies.city });
  return res.redirect('https://www.baidu.com');
};


exports.card_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_list.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.card_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_detail.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.card_home = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_home.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.card_progress = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/card_progress.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.self_home = function (req, res, next) {
  productLogic.productList(function (err, products) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_home.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      products: products || []
    });
  });
};

exports.self_local = function (req, res, next) {
  creditPeopleLogic.creditPeopleList(function (err, credit_people_list) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/self_local.client.view.html');
    return res.render(filepath, {
      city: req.cookies.city || '',
      credit_people_list: credit_people_list || []
    });
  });
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
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_auth_info.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};

exports.vip_notice = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip_notice.client.view.html');
  return res.render(filepath, { city: req.cookies.city });
};