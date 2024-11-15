//import mongoose from "mongoose";

const mongoose = require("mongoose");

const productCat = mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    imageUrl:{
        type:String,
        required : true
    },
    id:{
        type: Number,
        required : true
    }
})

const ProductCategory = mongoose.model('ProductCategory', productCat)

module.exports = ProductCategory