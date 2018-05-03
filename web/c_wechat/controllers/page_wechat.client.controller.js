function getLocation(callback) {
  wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      var speed = res.speed; // 速度，以米/每秒计
      var accuracy = res.accuracy; // 位置精度
      if (longitude > 0 && latitude > 0) {
        // updateUserLocation(longitude, latitude);
        if (callback)
          callback(res);
      }
      else {
        alert('获取定位失败！');
      }
    }
  });
}

function chooseImage(callback) {
  wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      return callback(localIds);
    }
  });
}

function uploadImage(localId, callback) {
  wx.uploadImage({
    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      var serverId = res.serverId; // 返回图片的服务器端ID
      return callback(res);
    }
  });
}

function takeCamera(callback) {
  wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      return callback(localIds);
    }
  });
}


function get_pre_pay_id(pay_type, callback) {
  $.ajax({
    method: 'post',
    url: '/api_wechat_pay/payment/get_pre_pay_id',
    data: {
      pay_type: pay_type
    },
    success: function (data) {
      if (data.prepay_id) {
        get_pre_pay_info(data.prepay_id, pay_type, function (info) {
          onBridgeReady(info, pay_type, function () {
            return callback();
          })
        })
      }
    }
  });
}

function get_pre_pay_info(prepay_id, pay_type, callback) {
  $.ajax({
    method: 'post',
    url: '/api_wechat_pay/payment/get_pre_pay_info',
    data: { prepay_id: prepay_id },
    success: function (data) {
      if (data.paySign) {
        return callback(data);
      }
      return callback(null);
    }
  });
}

function onBridgeReady(info, pay_type, callback) {
  var payinfo = {
    "appId": info.appId,     //公众号名称，由商户传入     
    "timeStamp": info.timeStamp,         //时间戳，自1970年以来的秒数     
    "nonceStr": info.nonceStr, //随机串     
    "package": info.package,
    "signType": "MD5",         //微信签名方式：     
    "paySign": info.paySign //微信签名 
  };
  // alert(JSON.stringify(payinfo));
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', payinfo,
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        if (pay_type == 'vip_pay') {
          window.location = '/page_wechat/vip_auth_info';
        }
        else if (
          pay_type == 'query_大数据' ||
          pay_type == 'query_黑灰行为' ||
          pay_type == 'query_黑中介' ||
          pay_type == 'pos_suixingfu' ||
          pay_type == 'pos_xinguodu'
        ) {
          return callback();
        }
        else {
          window.location = '/page_wechat/home';
        }
      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
    }
  );
}


function getUserJsApiTicket(url, callback) {
  $.ajax({
    url: '/api_wechat/getUserJsApiTicket',
    method: 'post',
    data: {
      url: url
    },
    success: function (data) {
      wx.config({
        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: ['getLocation', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'onMenuShareAppMessage', 'onMenuShareTimeline','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function () {
        callback();
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });

      wx.error(function (res) {
        alert('wx error' + JSON.stringify(res));
        callback(false);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    }
  });
}

function onMenuShareAppMessage(title, desc, url, img, successText) {
  wx.onMenuShareAppMessage({
    title: title, // 分享标题
    desc: desc, // 分享描述
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: encodeURI(img), // 分享图标
    success: function () {
      alert(successText);
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      alert('cancel')

      // 用户取消分享后执行的回调函数
    }
  });
}
function onMenuShareTimeline(title, url, img, successText) {
  wx.onMenuShareTimeline({
    title: title, // 分享标题
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: encodeURI(img), // 分享图标
    success: function () {
      alert(successText);
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
}

function onMenuShareQQ(title, desc, url, img) {
  wx.onMenuShareQQ({
    title: title, // 分享标题
    desc: desc, // 分享描述
    link: url, // 分享链接
    imgUrl: img, // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
}



