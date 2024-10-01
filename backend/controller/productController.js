const ProductModel = require('../models/productModel')
const express = require('express');
exports.getProducts = async (req , res , next) => {
    try {
        let query  = req.query.keyword? {name : {
            $regex : req.query.keyword,
        $options : 'i'}} : {}
        const products = await ProductModel.find(query);
        res.json({
            success: true,
            products,
            message: 'get products working'
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Error fetching products',
            error: err.message
        });
    }
};
exports.getSingleProduct = async (req , res , next) => {
    try {
        
        const product = await ProductModel.findById(req.params.id);
        res.json({
            success: true,
            product,
            message: 'get products working'
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
};
  