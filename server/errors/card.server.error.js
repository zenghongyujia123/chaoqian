'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
  card_id_is_empty: { err: { type: 'card_id_is_empty', message: 'card_id is empty', zh_message: '信用卡id为空' } },
  card_not_exist: { err: { type: 'card_not_exist', message: 'card is not exist', zh_message: '信用卡不存在' } }
});