$(function () {


  $('#fee_info').append(fee_info);
  $('#fee_info').html($('#fee_info').text());

  $('#other_info').append(other_info);
  $('#other_info').html($('#other_info').text());

  $('#apply_info').append(apply_info);
  $('#apply_info').html($('#apply_info').text());

  $('.c-detail-headr-title.fee_info').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
    $('#fee_info').show().siblings('.fee-header').hide();
  });
  $('.c-detail-headr-title.other_info').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
    $('#other_info').show().siblings('.fee-header').hide();
  });
  $('.c-detail-headr-title.apply_info').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
    $('#apply_info').show().siblings('.fee-header').hide();
  });

  $('.c-detail-headr-title.fee_info').click();

  $('#apply_strategy').append(apply_strategy);
  $('#apply_strategy').html($('#apply_strategy').text());

  




});