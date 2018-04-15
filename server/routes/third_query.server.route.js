/**
 * Created by zenghong on 2017/8/8.
 */

var thirdController = require('../controllers/third_query');
var userFilter = require('../filters/user');
var thirdQueryFilter = require('../filters/third_query');

module.exports = function (app) {
  //蜜罐大数据
  app.route('/third_query/mi_guan_da_shu_ju').post(userFilter.requireUser, thirdController.mi_guan_da_shu_ju);
  app.route('/third_query/ge_ren_hei_ming_dan').post(userFilter.requireUser, thirdController.ge_ren_hei_ming_dan);
  app.route('/third_query/hei_zhong_jie').post(userFilter.requireUser, thirdController.hei_zhong_jie);
  
  // app.route('/third_query/cardList').post(cardController.cardList);
  // app.route('/third_query/cardDetail').post(cardFilter.requireCard, cardController.cardDetail);
};