const {Schema} = require('mongoose');
const mongoURI = require('../Database/database');

const SchemaUser = Schema({
    firstname:{
        type:String,
        
    },
    lastname:{
        type:String,
        
    },
    number:{
        type:Number,
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
        
    },
    password:{
        type:String,
    },
    address:{
        type:String,
        
    },
    pincode:{
        type:Number,
        
    }
   
});

const User = mongoURI.model("user",SchemaUser);

module.exports = User;