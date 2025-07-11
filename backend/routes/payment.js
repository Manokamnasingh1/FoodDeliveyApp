// routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    });

    res.json(order);
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;
