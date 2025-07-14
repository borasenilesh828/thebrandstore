const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  brand: String,
  image: String,
  title: String,
  price: String,
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
  },
  cart: [cartItemSchema],
},
{
  collection: 'cart' 
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
