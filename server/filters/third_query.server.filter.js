'use strict';

var logic = require('./../logics/third_query');
var productErr = require('./../errors/product');

exports.requireThirdQuery = function (req, res, next) {
    var query_id = req.body.query_id || req.query.query_id || '';
    if (!query_id) {
        return next(productErr.product_id_empty);
    }

    logic.detail(query_id,function(err,result){
        if(err){
            return next(err);
        }

        if(!result){
            return next(productErr.product_not_exist);
        }

        req.third_query = result;
        return next();
    });
};