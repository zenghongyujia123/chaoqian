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

  $('#buycode_btn').click(function () {
//    alert("ok");
    getPrePayId();

  });
 
});


function getPrePayId() {
  $.ajax({
    method: 'post',
    url: '/page_wechat/getPrePayId4PayCredit',

    success: function (data) {

      if (data.prepay_id) {
        window.location = '/page_wechat/getPayPage?product=198&prepay_id=' + data.prepay_id;
      }
      console.log(data);
    }
  });
}