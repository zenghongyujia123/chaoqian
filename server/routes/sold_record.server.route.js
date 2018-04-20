/**
 * Created by zenghong on 2017/8/8.
 */

var soldRecordController = require('../controllers/sold_record');
//var soldRecordFilter = require('../filters/sold_record');

module.exports = function (app) {

  app.route('/sold_record/soldRecordList').post(soldRecordController.soldRecordList);
  app.route('/sold_record/vip69SoldList').post(soldRecordController.vip69SoldList);
  app.route('/sold_record/credit198SoldList').post(soldRecordController.credit198SoldList);
  app.route('/sold_record/soldRecordListByCondition').post(soldRecordController.soldRecordListByCondition);

  app.route('/sold_record/get_by_id').post(soldRecordController.get_by_id);
  app.route('/sold_record/update_sold_record').post(soldRecordController.update_sold_record);
  
 // app.route('/sold_record/recordDetail').post(soldRecordFilter.requireSoldRecord,soldRecordController.recordDetail);
};