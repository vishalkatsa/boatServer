const mongoose = require('mongoose');

const Shipping_AdressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  fullname:{
    type: String,
    require:true
  },
  mobilenumber:{
    type: Number,
    require:true
  },
  pincode:{
    type: String,
    require:true
  },
  state:{
    type: String,
    require:true
  },
  city:{
    type: String,
    require:true
  },
  fulladdress:{
    type: String,
    require:true
  },
  roadnumber:{
    type: String,
    require:true
  },
  createdAt: {  
    type: Date,
    default: Date.now
  }
});

const ShippingAddress = mongoose.model('shippingaddress', Shipping_AdressSchema);

module.exports = ShippingAddress;
