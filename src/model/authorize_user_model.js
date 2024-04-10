const { Schema } = require('mongoose');
const mongoURI = require('../Database/database');

const AuthorizeUserRole = {
    Superadmin: 'superadmin',
    Director: 'director',
    WarehouseManager: 'warehouse_manager',
    CustomerService: 'customer_service',
    SalesManager: 'sales_manager',
    MarketingManager: 'marketing_manager',
    ContentManager: 'content_manager',
    Accountant: 'accountant',

};

const SchemaAuthorizeUser = Schema({
    role: {
        type: String,
        enum: Object.values(AuthorizeUserRole),
        required: true
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
        type: String,
        required: true,
        unique:true,
    },

});

const AuthorizeUser = mongoURI.model('authorizeuser', SchemaAuthorizeUser);

module.exports = { AuthorizeUser }