'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {

  jietiao_id_empty: { err: { type: 'jietiao_id_empty', message: 'jietiao_id is empty', zh_message: '借条id为空' } },
  product_id_is_empty: { err: { type: 'product_id_is_empty', message: 'product_id is empty', zh_message: '产品id为空' } },
  product_not_exist: { err: { type: 'product_not_exist', message: 'product is not exist', zh_message: '产品不存在' } },
  jietiao_not_exist: { err: { type: 'jietiao_not_exist', message: 'jietiao is not exist', zh_message: '借条不存在' } }
});