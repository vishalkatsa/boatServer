const { Schema } = require('mongoose');
const mongoURI = require('../Database/database');

const SellerAuthRole = {
  
    seller: 'seller',
    // CustomerService: 'customer_service',
    // SalesManager: 'sales_manager',
    // MarketingManager: 'marketing_manager',
    // ContentManager: 'content_manager',
    // Accountant: 'accountant',

};

const SchemaAuthorizeUser = Schema({
    role: {
        type: String,
        enum: Object.values(SellerAuthRole),
        required: true,
        default:"seller"
    },
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique:true,
    }, 
    password: {
        type: String,
        required: true
    }, 
    mobile: {
        type: Number,
        required: true,
        unique:true,
    },
    shop_or_company: {
        type: String,
        required: true
    },
    gstnumber: {
        type: String,
    },
    createAt:{
        type: Date,
        require : true,
        default:Date.now()
    } 

});

const SellerAuth = mongoURI.model('sellerauth', SchemaAuthorizeUser);

module.exports = { SellerAuth }