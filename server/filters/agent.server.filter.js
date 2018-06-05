'use strict';

var agentLogic = require('./../logics/agent');
var agetnErr = require('./../errors/agent');

exports.requireAgent = function (req, res, next) {
    var detail_id = req.body.detail_id || req.query.detail_id || '';
    if (!detail_id) {
        return next(agetnErr.detail_id_empty);
    }

    agentLogic.agent_detail(detail_id, function (err, result) {
        if (err) {
            return next(err);
        }

        if (!result) {
            return next(agetnErr.agent_not_exist);
        }

        req.agent = result;
        return next();
    });
};