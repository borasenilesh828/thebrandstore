const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: 'User Already Exists', success: false });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(200).json({ message: 'Registration successful', success: true });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(200).json({ message: 'Username is already taken', success: false });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});




router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(200).json({ message: 'User does not exist', success: false });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(200).json({ message: 'Incorrect Password', success: false });
    }

    res.status(200).json({ message: 'Login Successful', success: true, username: existingUser.username, email:email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});


  


module.exports = router;
