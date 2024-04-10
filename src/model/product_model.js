const {Schema} = require("mongoose")
const mongoURI =require('../Database/database');


const SchemaProduct = Schema({
    productname:{
        type:String,
        // require:true
    },
    discription:{
        type:String,
        // require:true
    },
    catagory:{
        type:String,
        // require:true
    },
    price:{
        type:Number,
        // require:true
    },
    stock:{
        type:Number,
        // require:true
    },
    image:{
        type:String,
        // require:true
    },
    sellerId: {
        type:Schema.Types.ObjectId,
        ref:"sellerauth",
        require:true,
    },
    creatAt:{
        type:Date,
        default: Date.now
        // require:true
    },

});

const Product = mongoURI.model('product',SchemaProduct);



module.exports = {Product}