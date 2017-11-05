$(function () {
  $('.submit-btn').click(function () {
    $.ajax({
      method: 'post',
      url: '/user/updateUserAuth2',
      success: function (data) {
        console.log(data);
        if (!data.err) {
          window.location = window.location;
        }
      }
    });
  });
});