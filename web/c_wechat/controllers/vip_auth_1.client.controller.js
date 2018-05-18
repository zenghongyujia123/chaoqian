$(function () {

  var VIP_auth_start_date = "VIP_auth_start_date";
  $('.submit-btn').click(function () {

    var real_bank_number = $('.real_bank_number').val();
    var real_name = $('.real_name').val();
    var real_phone = $('.real_phone').val();
    var id_card = $('.id_card').val();

    if (!real_name) {
      return alert('请输入真实姓名');
    }

    if (!real_bank_number) {
      return alert('请输入银行卡号');
    }


    if (real_phone.length != 11) {
      return alert('这个用户手机号不正确！');
    }

    if (!id_card) {
      return alert('请输入真实身份证号');
    }

    $.ajax({
      method: 'post',
      url: '/user/updateUserAuth1',
      data: {
        real_name: real_name,
        real_phone: real_phone,
        id_card: id_card,
        real_bank_number: real_bank_number
      },
      success: function (data) {
        console.log(data);
        if (typeof (api) !== 'undefined') {
          return window.location = '/lianlian_pay/page_lianlian?pay_type=vip_pay';
        }else{
          get_pre_pay_id('vip_pay', function () {
          })
        }
      }
    });
  });
});

// c_anme : VIP 审核  VIP_auth_start_date , expiredays : 有效时间， 一般30天 。 
//效时间已经超过30天，就删掉COOKIE
function setCookie(c_name, expiredays) {
  var current_date = new Date();
  var exdate = new Date();
  var mytime = current_date.getTime().toString();   //获取当前日期与时间 , VIP 审核开始时间
  exdate.setDate(current_date.getDate() + expiredays);

  //alert(mytime);
  document.cookie = c_name + "=" + mytime + ((expiredays == null) ? "" : ";expires=" + exdate.toLocaleString()) + ";";
}

//删除cookies 
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getCookie(c_name) {
  // var c_name="startime";
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  else {
    return "";
  }
}