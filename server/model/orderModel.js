const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: String,
  brand: String,
  image: String,
  title: String,
  price: String,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  OrderID: String,
  Products_Total: String,
  GST: String,
  Discount: String,
  Shipping_Charges: String,
  Total: String,
  Payment_Method: String,
  date:Date,
  items: [itemSchema], 
});

const userOrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  orders: [orderSchema],
}, {
  collection: 'order' 
});

const UserOrder = mongoose.model('UserOrder', userOrderSchema);

module.exports = UserOrder;
