/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;

var AgentHistory = appDb.model('AgentHistory');
var Agent = appDb.model('Agent');
var sysErr = require('./../errors/system');

var that = exports;

exports.update_agent = function (info, callback) {
  if (!info._id) {
    info._id = mongoose.generateNewObjectId();
  }

  Agent.findOne({ _id: info._id }, function (err, agent) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!agent) {
      agent = new Agent({});
    }
    agent.type = info.type || '';
    agent.str1 = info.str1 || '';
    agent.str2 = info.str2 || '';
    agent.str3 = info.str3 || '';
    agent.str4 = info.str4 || '';
    agent.str5 = info.str5 || '';
    agent.str6 = info.str6 || '';
    agent.str7 = info.str7 || '';
    agent.str8 = info.str8 || '';
    agent.str9 = info.str9 || '';
    agent.str10 = info.str10 || '';
    agent.str11 = info.str11 || '';
    agent.str12 = info.str12 || '';
    agent.save(function (err, reuslt) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, reuslt);
    });
  });
};

exports.list_agent = function (info, callback) {
  Agent.find({ type: info.type }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  });
}

exports.agent_detail = function (id, callback) {
  Agent.findOne({ _id: id }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  });
}

exports.update_history = function (user, agent, callback) {
  AgentHistory.findOne({ user: user._id, agent: agent._id, type: agent.type }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    if (result) {
      return callback(null, result);
    }

    new AgentHistory({
      type: agent.type,
      user: user._id,
      agent: agent._id
    }).save(function (err, result) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, result);
    });
  });
}

exports.list_history = function (agent, callback) {
  AgentHistory.find({ agent: agent._id }).populate('user').exec(function (err, results) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results)
  })
}


