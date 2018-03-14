
$(function () {

  var send_verify_code = GetRandomNum(1000,9999);
  var x = document.getElementById("verify_button");

  function resend(){
    var i=0;
    x.innerHTML = "请等待 30秒 ";
    var timer1=window.setInterval(function () {
      
      i=i+1;
      var s=30-i;
      x.innerHTML ="请等待 "+s+'秒';
      if(i==30)
      {
        x.innerHTML = "重新发送";
        window.clearInterval(timer1);
      }
    },1000);
  };
 
  $('.signup-verify-btn').click(function () {

    var username = $('.username').val();   
    var apikey = '1c18748ca1c51add4fcde413188c68b0';
    var x = document.getElementById("verify_button");
        
    // 指定发送模板的内容
    //亲爱的#name#，您的验证码是#code#。有效期为#hour#，请尽快验证
    var tpl_value =  "#name#=";
    tpl_value += '客户';
    tpl_value += '&#code#=';
    tpl_value += send_verify_code;
    tpl_value += '&#hour#=20分钟';

 //   if (username.length!=11) {
 //     return alert('请输入正确的手机号');
 //   }
    if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(username))){ 
      return alert("请确认手机号码是否正确！");
     }
    $.ajax({
      url: 'https://sms.yunpian.com/v2/sms/tpl_single_send.json',
      method: 'post',
      headers: {  
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
    } ,
      port: 443,  
      data:{
        'apikey': '1c18748ca1c51add4fcde413188c68b0' ,
        'mobile':username,
        'tpl_id': '2072060',
        'tpl_value': tpl_value,
      },
      complete : function(XMLHttpRequest , textStatus){
        //return alert('completed !');
        resend();
      },
      //error: erryFunction,  //错误执行方法    
      //success: succFunction, //成功执行方法
    }); 
  });


  $('.signup-btn').click(function () {
    var username = $('.username').val();
    var verifycode=$('.verify_code').val();
    var password = $('.password').val();
    var repassword = $('.repassword').val();
 //   var invite_code = $('.invite_code').val();
 //   var invite_code= "<%= code %>";
    var invite_code =  $('.code').text();

    invite_code=invite_code.replace(/[\r\n]/g, "");
    invite_code = invite_code.replace(/[ ]/g, ""); 
//    alert(invite_code);
    if (invite_code=='')invite_code = $('.invite_code').val();
//    alert(invite_code);

    if (verifycode != send_verify_code) {
      return alert('验证码不正确！');
    }
    if (!password) {
      return alert('请输入密码');
    }

    if (!repassword) {
      return alert('请输入重复密码');
    }

    if (password !== repassword) {
      return alert('密码必须相同');
    }

    var top_parent=''; //缺省

// 先判断邀请码是否是注册用户，再找到邀请码的上线作为上上线存到数据库

    if(invite_code=='')
    {

      sign_up (username,password,'','');
    }
    else if(invite_code.length!=11||invite_code==username){
      return alert('邀请码不正确，请重新输入或不填！');

    } 
    else {

      $.ajax({
        url: '/user/getUserByUsername',
        method: 'post',
        data: {
            username: invite_code
        },
        success: function (data) {
          //data :直接返回的是user objective typeof(data)=="undefined"
  //       alert(JSON.stringify(data));
          if (data._id==''||data.parent==invite_code||data.parent==username||typeof(data)=="undefined"||typeof(data.parent)=="undefined") {
          return alert('该邀请码不存在，请重新输入或不填');
           }
          else{
            if(typeof(data.parent)=='undefined'||data.parent=='') {
  //            alert('no parent!'); 
              top_parent='';
            }
            else  top_parent = data.parent;
  //          alert(top_parent);
            sign_up (username,password,top_parent,invite_code);
          }


        },
        error: function(err){
        return alert('出错了！');
        }
      });


    }

  });
});



function GetRandomNum(Min,Max)
{   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
};

var sign_up =function(username,password,top_parent,invite_code){

//  alert('top_parent:'+top_parent);
  $.ajax({
    url: '/user/signup',
    method: 'post',
    data: {
      user_info: {
        username: username,
        password: password,
        top_parent:top_parent,
        code: invite_code //parent
      }
    },
    success: function (data) {
      if (data.err) {
        return alert(data.err.zh_message);
      }
      console.log(data);
      if (data.success) {
        window.location = '/page_wechat/home';
      }
    }
  });   
}

/*
    var check_mobile=function(sMobile){
      if(!(/^1[3|4|5|8|9][0-9]\d{4,8}$/.test(sMobile))){ 
        alert("请确认号码是否正确！");
        return '';
      }
      else return sMobile;
    }
    username=check_mobile(username);
*/
