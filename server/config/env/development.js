'use strict';

module.exports = {
  env: 'development',
  appDb: 'mongodb://localhost/c-dev',
  port: process.env.PORT || 5002,
  // newAppDb: 'mongodb://localhost/z-new-dev',
  // mapDb: 'mongodb://localhost/z-dev',
  // logDb: 'mongodb://localhost/z-log-dev',
  // authDb: 'mongodb://localhost/z-auth-dev',
  // serverAddress: 'http://localhost:4002/',
  // recycleDuration: 600, //单位：秒
  // openAllActivity: false,
  // recentPublishTime: '2016/06/20 11:42:49',//todo 之后去除
  // openActivityConfig: {"android":{"openAllActivity":true,"recentPublishTime":"2016/06/20 11:42:49"},"ios":{"openAllActivity":true,"recentPublishTime":"2016/06/20 11:42:49"}},
  // taskDuration: {"offline":54000,"online":1800,"freshman":86400},
  // activitySeeRadius: 10000,//5km
  // poiSeeRadius: 3,
  // businessPageUrl: {"taskShare":"http://localhost:4002/home/task_share","taskAchievement":"http://localhost:4002/home/achievement_share","point_shop":"http://localhost:4002/home/point_shop"},
  // slaveValidDays: 180,
  // slaveRewardPercent: 0.1,
  // taskTime: {"normal":21600,"survey":120},
  // taskOrder: {"internalSystemErrorCount":20,"timeStamp":{"error":60000,"noData":1800000000,"hasData":1000}},
  // wechat_server: {"address":"https://api.weixin.qq.com/","app_id":"wx0918b8e7ebb45873","app_secret":"d4624c36b6795d1d99dcf0547af5443d"},//开放平台中 顺手赚钱应用appid
  // wechat_mp: {"app_id":"wx6529791b014d0b22","app_secret":"6eb90c4299c417ebea1e344682d5124c","getTokenUrl":"https://api.weixin.qq.com/cgi-bin/token","getUserInfoUrl":"https://api.weixin.qq.com/cgi-bin/user/info","autoReplyUrl":"https://api.weixin.qq.com/cgi-bin/message/custom/send"},//公众平台 顺手赚吧
  // userAuthenticateServer: {"address":"http://localhost:5002/","port":5002,"database":"mongodb://localhost/z-auth-dev"},
  // enquiryServer: {"address":"http://localhost:5004/","port":5004,"database":"mongodb://localhost/z-enquiry-dev"},
  // smsServer: {"address":"http://localhost:5007/","port":5007},
  // certification: {"privatekey":"../certification/debug/privatekey.pem","certificate":"../certification/debug/certificate.pem"},
  // appInfo: {
  //   position_range: 10000,//10千米
  //   answer_range: 10000,//1千米
  //   android: {"updateContent":"经销商可以和小店店主进行聊天\n\r改善客户端稳定性与体验优化","force":false,"version":"2.2.7","versionCode":202007,"downloadUrl":"http://localhost:4002/app/download/android","apkFilePath":"../../app_resources/native/production-test/app-debug.apk","package_name":"com.doujiaokeji.shunshouzhuanqian"},
  //   ios: {"updateContent":"经销商可以和小店店主进行聊天\n\r改善客户端稳定性与体验优化","force":false,"version":"2.2.5","versionCode":202005,"appStoreId":"itms-apps://itunes.apple.com/cn/app/shun-shou-zhuan/id1087257631?mt=8","message":false},
  //   android_professional: {"updateContent":"","force":false,"version":"1.0.0","versionCode":100000,"downloadUrl":"http://localhost:4002/app/download/android/professional","apkFilePath":"../../app_resources/native/production-test/app-professional-debug.apk","package_name":"com.doujiaokeji.shunshouzhuanqian_pro"},
  //   ios_professional: {"updateContent":"","force":false,"version":"1.0.0","versionCode":100000,"appStoreId":"itms-apps://itunes.apple.com/cn/app/shun-shou-zhuan/id1226923662?mt=8","message":false},
  //   ios_enterprise: undefined
  // },
  // payment: {"port":6002,"address":"http://localhost:6002/","serverAddress":"http://localhost:6002/","spbill_create_ip":"101.228.63.161","payment_certificate":{"privatekey":"./certification/debug_payment/apiclient_key.pem","certificate":"./certification/debug_payment/apiclient_cert.pem","ca":"./certification/debug_payment/rootca.pem"},"payment_params":{"privateKey":"1akejiDoujiaollenSocial2016Tfuck","payUrl":"https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers","mch_appid":"wx416e5d7df03fde74","mchid":"1290696901"}},
  // push: {"port":5003,"address":"http://localhost:5003/","serverAddress":"http://localhost:5003/","appKey":"f87434429a28768f73870997","masterSecret":"b9e1769f973fc876df510b37","xiaomi":{"appId":"2882303761517485226","appKey":"5121748568226","appSecret":"EOwJzLO6GyefDSJ4t0cl4A=="}},
  // synchronization: {"address":"http://localhost:5005/","port":5005,"appDb":"mongodb://localhost/z-sync-dev","logDb":"mongodb://localhost/z-sync-log-dev"},
  // autoTimeStamp: {
  //   publish: 8 * 60 * 60 * 1000,//每天的第8个小时（单位：ms）
  // },
  // redisServer: {"address":"127.0.0.1","port":"6379","connection":"redis://localhost:6379","password":"Elina","ttl":86400,"app_ttl":777600}
};
