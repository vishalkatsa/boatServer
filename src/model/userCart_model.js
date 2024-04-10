const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  price: {
    type: Number,
    require : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserCart = mongoose.model('usercart', userCartSchema);

module.exports = UserCart;
