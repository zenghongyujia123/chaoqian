'use strict';

var productLogic = require('./../logics/product');
var productErr = require('./../errors/product');

exports.requireProduct = function (req, res, next) {
    var product_id = req.body.product_id || req.query.product_id || '';
    if (!product_id) {
        return next(productErr.product_id_empty);
    }

    productLogic.productDetail(product_id,function(err,result){
        if(err){
            return next(err);
        }

        if(!result){
            return next(productErr.product_not_exist);
        }

        req.product = result;
        return next();
    });
};