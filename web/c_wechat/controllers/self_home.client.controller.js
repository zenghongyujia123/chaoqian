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
        sort_value = -1
        break;
      case 'str14':
      case 'str15':
        sort_key = type;
        sort_value = 1
        break;
      case 'str16':
      case 'str17':
      case 'str18':
        query_key = type;
        query_value = 1
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


  function getUserJsApiTicket(callback) {
    $.ajax({
      url: '/page_wechat/getUserJsApiTicket',
      method: 'post',
      success: function (data) {
        if (callback) {
          return callback(data);
        }
      }
    });
  }

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

  getUserJsApiTicket(function (data) {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appid, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.noncestr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名，见附录1
      jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
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

    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  });
});