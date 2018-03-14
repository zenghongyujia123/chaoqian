$(function () {

  var VIP_auth_start_date = "VIP_auth_start_date";
  $('.submit-btn').click(function () {
    var real_name = $('.real_name').val();
    var real_phone = $('.real_phone').val();
    var id_card = $('.id_card').val();

    if (!real_name) {
      return alert('请输入真实姓名');
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
        id_card: id_card
      },
      success: function (data) {
        console.log(data);
        getPrePayId();
      }
    });
  });

  function getPrePayId() {
    $.ajax({
      method: 'post',
      url: '/page_wechat/getPrePayId',
      
      success: function (data) {
        //Vincent testing the Pay component 12.23
        //alert(JSON.stringify(data));
        //存下VIP 资质认证开始时间，10天就过期
        delCookie(VIP_auth_start_date);
        setCookie(VIP_auth_start_date,10);

        if (data.prepay_id) {
          window.location = '/page_wechat/getPayPage?product=69&prepay_id=' + data.prepay_id;
        }
        console.log(data);
      }
    });
  }


});

// c_anme : VIP 审核  VIP_auth_start_date , expiredays : 有效时间， 一般30天 。 
//效时间已经超过30天，就删掉COOKIE
function setCookie(c_name,expiredays)  
{
    var current_date=new Date();
    var exdate=new Date();
    var mytime=current_date.getTime().toString();   //获取当前日期与时间 , VIP 审核开始时间
    exdate.setDate(current_date.getDate()+expiredays);
    
    //alert(mytime);
    document.cookie=c_name+ "=" +mytime+((expiredays==null) ? "" : ";expires="+exdate.toLocaleString())+";";
}

//删除cookies 
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}

function getCookie(c_name)
  {
   // var c_name="startime";
  if (document.cookie.length>0)
    {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        { 
        c_start=c_start + c_name.length+1 
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
  else
    {
    return "";
   }
}