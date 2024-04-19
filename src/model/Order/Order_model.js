const {Schema} = require("mongoose")
const mongoURI =require('../../Database/database');


const SchemaOrder = Schema({
    totalprice:{
        type:String,
        require:true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max:10
      },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"product",
        require:true,
    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:"shippingaddress",
        // require:true,
    },
    sellerId: {
        type:Schema.Types.ObjectId,
        ref:"sellerauth",
        require:true,
    },
     userId: {
        type:Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
    paymentStatus:{
        type:Boolean,
        default:false
    },
    paymentID:{
        type:String,

    },
    cancelStatus:{
        type:Boolean,
        default:false
    },
    creatAt:{
        type:Date,
        default: Date.now,
        require:true
    },

});

const Order = mongoURI.model('order',SchemaOrder);



module.exports = Order