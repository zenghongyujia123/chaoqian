'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
  article_id_is_empty: { err: { type: 'article_id_is_empty', message: 'article_id is empty', zh_message: '产品id为空' } },
  article_not_exist: { err: { type: 'article_not_exist', message: 'article is not exist', zh_message: '产品不存在' } },
});