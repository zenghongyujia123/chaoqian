$(function () {
  var mySwiper = new Swiper('.swiper-container', {
 //   loop: true,
    // 如果需要分页器
  //  pagination: '.swiper-pagination',
    // 如果需要前进后退按钮

    pagination: '.swiper-pagination',
    paginationClickable: true,
    speed: 2000,
    loop: true,
    observer:true,
    observeParents:true,
    autoplayDisableOnInteraction : false,
    autoplay:1500
  });

 
 // setCookie();

 // var myCookie = getCookie("startime");

 // alert("mycookie="+myCookie);

 // delCookie("startime");
// var VIP_auth_start_date = "VIP_auth_start_date";
// var EXPIREDAYS = 0; //调试时用1 ，退出就删除，以后用30天

/* 
 delCookie(VIP_auth_start_date);
 setCookie(VIP_auth_start_date,1);
 var myCookie = getCookie(VIP_auth_start_date);
 alert("mycookie="+myCookie);
*/


  // wx.ready(function () {

  //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

  // });

  // wx.error(function (res) {

  //   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

  // });
});


/*
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

function getWaitingtime(c_name)
{
  var current_date=new Date();
  var vip_start_date ;
 // alert(getCookie(c_name));
  vip_start_date = parseInt(getCookie(c_name)); // 转为整型数

  var date3 = current_date.getTime() - vip_start_date;   //时间差的毫秒数   
 // alert("startdate="+vip_start_date.toString()+"currentdate="+current_date.getTime().toLocaleString());     
  //alert();
  
    //计算出相差天数  
    var days=Math.floor(date3/(24*3600*1000))  
  
    //计算出小时数  
  
    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数  
    var hours=Math.floor(leave1/(3600*1000))  
    //计算相差分钟数  
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
    var minutes=Math.floor(leave2/(60*1000))  
    //计算相差秒数  
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
    var seconds=Math.round(leave3/1000)  

    alert("时间过了：" +hours.toLocaleString()+"小时"+minutes.toLocaleString()+"分钟"+seconds.toLocaleString()+"秒");


  }

*/