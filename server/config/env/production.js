'use strict';

module.exports = {
  env: 'production',
  // appDb: 'mongodb://elina:Social2016@10.117.194.50:27017/z-pro',
  // newAppDb: 'mongodb://elina:Social2016@10.117.194.50:27017/z-new-pro',
  // mapDb: 'mongodb://elina:Social2016@10.117.64.54:27017/z-map-pro',
  // logDb: 'mongodb://elina:Social2016@10.117.194.50:27017/z-log-pro',
  // authDb: 'mongodb://elina:Social2016@10.117.194.50:27017/z-auth-pro',
  // serverAddress: 'https://agilepops.com/',
  // port: process.env.PORT || 443,
  // recycleDuration: 300, //单位：秒
  // openAllActivity: true,
  // recentPublishTime: '2016/09/14 23:00:00',//todo 之后去除
  // openActivityConfig: {"android":{"openAllActivity":true,"recentPublishTime":"2016/06/21 10:00:00"},"ios":{"openAllActivity":true,"recentPublishTime":"2016/12/17 23:59:59"}},
  // taskDuration: {"offline":43200,"online":7200,"freshman":86400},
  // activitySeeRadius: 10000,//5km
  // poiSeeRadius: 3,
  // businessPageUrl: {"taskShare":"https://agilepops.com/home/task_share","taskAchievement":"https://agilepops.com/home/achievement_share","point_shop":"https://agilepops.com/home/point_shop"},
  // slaveValidDays: 180,
  // slaveRewardPercent: 0.1,
  // taskTime: {"normal":21600,"survey":120},
  // taskOrder: {"internalSystemErrorCount":20,"timeStamp":{"error":60000,"noData":1800000000,"hasData":1000}},
  // wechat_server: {"address":"https://api.weixin.qq.com/","app_id":"wx0918b8e7ebb45873","app_secret":"d4624c36b6795d1d99dcf0547af5443d"},//开放平台中 顺手赚钱应用appid
  // wechat_mp: {"app_id":"wx6529791b014d0b22","app_secret":"6eb90c4299c417ebea1e344682d5124c","getTokenUrl":"https://api.weixin.qq.com/cgi-bin/token","getUserInfoUrl":"https://api.weixin.qq.com/cgi-bin/user/info","autoReplyUrl":"https://api.weixin.qq.com/cgi-bin/message/custom/send"},//公众平台 顺手赚吧
  // userAuthenticateServer: {"database":"mongodb://elina:Social2016@10.117.194.50:27017/z-auth-pro","address":"http://localhost/","port":80},
  // enquiryServer: {"database":"mongodb://elina:Social2016@10.117.194.50:27017/z-enquiry-pro","address":"http://localhost:5004/","port":5004},
  // smsServer: {"address":"http://localhost:5007/","port":5007},
  // certification: {"privatekey":"../certification/release/server.key","certificate":"../certification/release/server.crt"},
  // appInfo: {
  //   position_range: 10,//10千米
  //   answer_range: 1,//1千米
  //   android: {"updateContent":"优化应用操作体验。\n\r","force":true,"version":"2.2.21","versionCode":202021,"downloadUrl":"https://agilepops.com/app/download/android","apkFilePath":"../../app_resources/native/production/shunshouzhuanqian-2.2.21.apk","package_name":"com.doujiaokeji.shunshouzhuanqian"},
  //   ios: {"updateContent":"优化应用操作体验。\n\r","force":true,"version":"2.2.19","versionCode":202019,"appStoreId":"itms-apps://itunes.apple.com/cn/app/shun-shou-zhuan/id1087257631?mt=8","message":true},
  //   android_professional: {"updateContent":"","force":false,"version":"1.0.0","versionCode":100000,"downloadUrl":"https://agilepops.com/app/download/android/professional","apkFilePath":"../../app_resources/native/production/shunshouzhuanqian-professional-1.0.0.apk","package_name":"com.doujiaokeji.shunshouzhuanqian_pro"},
  //   ios_professional: {"updateContent":"","force":false,"version":"1.0.0","versionCode":100000,"appStoreId":"itms-apps://itunes.apple.com/cn/app/shun-shou-zhuan/id1226923662?mt=8","message":false},
  //   ios_enterprise: undefined
  // },
  // payment: {"port":6002,"address":"http://10.117.199.115:6002/","serverAddress":"http://10.117.199.115:6002/","spbill_create_ip":"120.55.91.101","payment_certificate":{"privatekey":"./certification/wechat_payment/apiclient_key.pem","certificate":"./certification/wechat_payment/apiclient_cert.pem","ca":"./certification/wechat_payment/rootca.pem"},"payment_params":{"privateKey":"1akejiDoujiaollenSocial2016Tfuck","payUrl":"https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers","mch_appid":"wx6529791b014d0b22","mchid":"1272954901"}},
  // push: {"port":5003,"address":"http://localhost:5003/","serverAddress":"http://localhost:5003/","appKey":"f87434429a28768f73870997","masterSecret":"b9e1769f973fc876df510b37","xiaomi":{"appId":"2882303761517485226","appKey":"5121748568226","appSecret":"EOwJzLO6GyefDSJ4t0cl4A=="}},
  // synchronization: {"address":"http://localhost:5005/","port":5005,"appDb":"mongodb://elina:Social2016@10.117.194.50:27017/z-sync-pro","logDb":"mongodb://elina:Social2016@10.117.194.50:27017/z-sync-log-pro"},
  // autoTimeStamp: {
  //   publish: 8 * 60 * 60 * 1000,//每天的第8个小时（单位：ms）
  // },
  // redisServer: {"address":"120.55.91.101","port":"7071","connection":"redis://120.55.91.101:7071","password":"myRedisElina2016","ttl":86400,"app_ttl":777600}
};
