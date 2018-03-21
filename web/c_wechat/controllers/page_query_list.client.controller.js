$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    speed: 2000,
    loop: true,
    observer: true,
    observeParents: true,
    autoplayDisableOnInteraction: false,
    autoplay: 1500
  });
});

