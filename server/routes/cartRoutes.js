const express = require('express');
const router = express.Router();
const Cart = require('../model/cartModel');

router.post('/Cart', async (req, res) => {
  try {
    const { email, productId, quantity, brand, image, title, price } = req.body;

    const existingUser = await Cart.findOne({ email });

    if (existingUser) {
      if (!existingUser.cart) {
        existingUser.cart = [];
      }

      const existingProduct = existingUser.cart.find((product) => product.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        existingUser.cart.push({ productId, quantity, brand, image, title, price });
      }

      await existingUser.save();
      res.status(200).json({ message: 'Item added to Cart successfully' });
    } else {
      const newUserCart = new Cart({ email, cart: [{ productId, quantity, brand, image, title, price }] });
      await newUserCart.save();
      res.status(201).json({ message: 'User and Item added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cart operation failed' });
  }
});


router.get('/CartHistory/:email', async (req, res) => {
  try {
    const email = req.params.email;

    const existingUser = await Cart.findOne({ email });

    if (existingUser) {
      const cartHistory = existingUser.cart || [];
      res.status(200).json(cartHistory);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve cart history' });
  }
});


router.post('/removeItem', async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;

    const existingUser = await Cart.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!existingUser.cart || existingUser.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const existingProduct = existingUser.cart.find((product) => product.productId === productId);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity to remove' });
    }

    existingProduct.quantity -= 1;

    if (existingProduct.quantity < 0) {
      existingProduct.quantity = 0;
    }

    if (existingProduct.quantity === 0) {
      existingUser.cart = existingUser.cart.filter((product) => product.productId !== productId);
    }

    await existingUser.save();
    res.status(200).json({ message: 'Item(s) updated in the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cart operation failed' });
  }
});


router.post('/DeleteCart', async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await Cart.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    existingUser.cart = [];

    await existingUser.save();
    res.status(200).json({ message: 'All cart product details deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Delete operation failed' });
  }
});

 

module.exports = router;
