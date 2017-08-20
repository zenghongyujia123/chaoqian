/**
 * Created by zenghong on 2017/8/8.
 */
var Product = require('mongoose').appDb;
var productLogic = require('./../logics/product');

exports.updateProduct = function (req, res, next) {
    productLogic.updateProduct(req.body.product_info, function (err, result) {
        if (err) {
            return next(err);
        }
        req.data = result;
        return next();
    });
};

exports.productList = function (req, res, next) {
    productLogic.productList( function (err, result) {
        if (err) {
            return next(err);
        }
        req.data = result;
        return next();
    });
};

exports.productDetail = function (req, res, next) {

};