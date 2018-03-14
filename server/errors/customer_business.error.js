'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
    record_id_is_empty: { err: { type: 'record_id_is_empty', message: 'record_id is empty', zh_message: '记录id为空' } },
    record_not_exist: { err: { type: 'record_not_exist', message: 'record is not exist', zh_message: '记录不存在' } }
});