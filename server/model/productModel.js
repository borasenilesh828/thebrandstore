const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: String,
    image: String,
    title: String,
    brand: String,
    price: String,
    category: String,
    subcategory: String,
    description: String,
    rating: {
      star: String,
      count: String,
    },
  },
  {
    collection: 'product' 
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
