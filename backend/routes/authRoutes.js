// routes/authRoutes.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, 'jwtsecret', { expiresIn: '30d' });

router.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.json({ ...user._doc, token: generateToken(user._id) });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await user.matchPassword(req.body.password)) {
    res.json({ ...user._doc, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
