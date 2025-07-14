const express = require('express');
const router = express.Router();
const UserOrder = require('../model/orderModel');

router.post('/Order', async (req, res) => {
  try {
    const { email, orderID, product_total, gst, discount, Shipping, total_price, payment, cartItems } = req.body;

    const existingUser = await UserOrder.findOne({ email });

    if (existingUser) {
      
      const newOrder = {
        OrderID: orderID,
        Products_Total: product_total,
        GST: gst,
        Discount: discount,
        Shipping_Charges: Shipping,
        Total: total_price,
        Payment_Method: payment,
        date: new Date(),
        items: cartItems, 
      };

      existingUser.orders.push(newOrder);

      await existingUser.save();
      res.status(200).json({ message: 'Order added successfully' });
    } else {
      const newOrder = {
        OrderID: orderID,
        Products_Total: product_total,
        GST: gst,
        Discount: discount,
        Shipping_Charges: Shipping,
        Total: total_price,
        Payment_Method: payment,
        date: new Date(),
        items: cartItems,
      };

      const newUserOrder = new UserOrder({
        email,
        orders: [newOrder],
      });

      await newUserOrder.save();
      res.status(201).json({ message: 'User and order added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order failed' });
  }
});




router.get('/OrderHistory', async (req, res) => {
  try {
    const { email } = req.query;

    const user = await UserOrder.findOne({ email });

    if (user) {
      res.status(200).json({ orderHistory: user.orders });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching order history' });
  }
});


module.exports = router;
