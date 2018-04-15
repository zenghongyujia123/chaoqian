$(function () {
  $('.filter-select').change(function () {
    var type = $(this).val();
    var sort_key = '';
    var sort_value = '';
    var query_key = '';
    var query_value = '';

    switch (type) {
      case 'str13':
        sort_key = type;
        sort_value = -1;
        break;
      case 'str14':
      case 'str15':
        sort_key = type;
        sort_value = 1;
        break;
      case 'str16':
      case 'str17':
      case 'str18':
        query_key = type;
        query_value = 1;
        break;
      default:
        sort_key = "create_time";
        sort_value = -1;
        break;
    }

    var arr = [
      'sort_key=' + sort_key,
      'sort_value=' + sort_value,
      'query_key=' + query_key,
      'query_value=' + query_value,
    ]

    window.location = '/page_wechat/self_home?' + arr.join('&');
  });

  function updateUserLocation(lng, lat) {
    $.ajax({
      url: '/user/updateUserLocation',
      method: 'post',
      data: {
        lng: lng,
        lat: lat
      },
      success: function (data) {
      }
    });
  }

  getUserJsApiTicket(window.location.href,function (data) {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        var speed = res.speed; // 速度，以米/每秒计
        var accuracy = res.accuracy; // 位置精度
        if (longitude > 0 && latitude > 0) {
          updateUserLocation(longitude, latitude);
        }
      }
    });
  
  });
});