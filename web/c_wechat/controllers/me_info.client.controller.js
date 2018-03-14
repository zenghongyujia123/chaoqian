$(function(){

    $('.submit-btn').click(function () {
        var real_name = $('.real_name').val();
        var alipay_id = $('.alipay').val();
        var email=$('.email').val();
        var adress = $('.adress').val();
    //alert('ok');
        var user_id=$('.myuserid').text();
        user_id=user_id.replace(/[\r\n]/g, "");
        user_id = user_id.replace(/[ ]/g, ""); 
        $.ajax({
            url: '/user/updateAddInfo',
            method: 'post',
            data: {
              user_id: user_id,
              user_info: {  
                "real_name" : real_name,
                "alipay_id" : alipay_id,
                "email" : email,
                "adress" : adress
              }
            },
            success: function (data) {
              console.log(data);
                window.location = '/page_wechat/home';
            }
          });   
    
    });
});


