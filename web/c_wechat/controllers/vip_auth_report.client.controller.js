$(function () {

  
 /* 
  delCookie(VIP_auth_start_date);
  setCookie(VIP_auth_start_date,1);
  var myCookie = getCookie(VIP_auth_start_date);
  alert("mycookie="+myCookie);
*/

//vip_waiting_time
window.setInterval( " update_waiting_time() " , 1000 );

});

function update_waiting_time()
{
  var VIP_auth_start_date = "VIP_auth_start_date";
  var x = document.getElementById("vip_waiting_time");
  x.innerHTML = getWaitingtime(VIP_auth_start_date);
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

function getWaitingtime(c_name)
{
  var current_date=new Date();
  var vip_start_date ;
 // alert(getCookie(c_name));
  vip_start_date = parseInt(getCookie(c_name)); // 转为整型数

  var date3 = current_date.getTime() - vip_start_date;   //时间差的毫秒数   
 // alert("startdate="+vip_start_date.toString()+"currentdate="+current_date.getTime().toLocaleString());     
  //alert();
  // 以13小时为审批承诺时间，再改为36小时 
  date3= 24 * 3600 * 1000 -date3;

    //计算出相差天数  
    var days=Math.floor(date3/(24*3600*1000))  ;
  
    //计算出小时数  
  
    var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数  
    var hours=Math.floor(leave1/(3600*1000))  ;

    //加上days*24
    hours=hours+days*24;

    //计算相差分钟数  
    var leave2=leave1%(3600*1000)  ;      //计算小时数后剩余的毫秒数  
    var minutes=Math.floor(leave2/(60*1000))  ;
    //计算相差秒数  
    var leave3=leave2%(60*1000) ;     //计算分钟数后剩余的毫秒数  
    var seconds=Math.round(leave3/1000) ; 

   // alert("时间过了：" +hours.toLocaleString()+"小时"+minutes.toLocaleString()+"分钟"+seconds.toLocaleString()+"秒");
    return(hours.toLocaleString()+":"+minutes.toLocaleString()+":"+seconds.toLocaleString());
  //  return(hours.toLocaleString()+":"+minutes.toLocaleString());

  }