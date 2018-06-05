'use strict';
var _ = require('lodash');

module.exports = _.extend(exports, {
  agent_id_is_empty: { err: { type: 'agent_id_is_empty', message: 'agent_id is empty', zh_message: '代理id为空' } },
  agent_not_exist: { err: { type: 'agent_not_exist', message: 'agent is not exist', zh_message: '代理不存在' } },
});