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
    observer: true,
    observeParents: true,
    autoplayDisableOnInteraction: false,
    autoplay: 1500
  });

  $('#buycode_btn').click(function () {
    //    alert("ok");
    if (typeof (api) !== 'undefined') {
      return window.location = '/lianlian_pay/page_lianlian?pay_type=postcode_pay' ;
    }
    else{
      get_pre_pay_id('postcode_pay', function () {

      });
    }
  });

});


