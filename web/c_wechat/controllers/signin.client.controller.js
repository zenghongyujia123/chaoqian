$(function () {
  $('.signup-btn').click(function () {
    var username = $('.username').val();
    var password = $('.password').val();

    if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(username))){ 
     return alert("请确认号码是否正确！");
    }
    if (!password) {
      return alert('请输入密码');
    }

    $.ajax({
      url: '/user/signin',
      method: 'post',
      data: {
        user_info: {
          username: username,
          password: password
        }
      },
      success: function (data) {
        if (data.err) {
          return alert(data.err.zh_message);
        }
        console.log(data);
        if (data.success) {
          signinSuccess();
        }
      }
    });

  });
});