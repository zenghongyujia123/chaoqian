'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
    credit_people_id_is_empty: { err: { type: 'credit_people_is_empty', message: 'credit_people_id is empty', zh_message: '信贷专员id为空' } },
    credit_people_not_exist: { err: { type: 'credit_people_not_exist', message: 'credit_people is not exist', zh_message: '信贷专员不存在' } }
});