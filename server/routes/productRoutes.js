const express = require('express');
const router = express.Router();
const Product = require('../model/productModel');

router.get('/product', async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const products = await Product.find({ category: category });
      res.status(200).json(products);
    } else {
      const products = await Product.find({});
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving products' });
  }
});



module.exports = router;
