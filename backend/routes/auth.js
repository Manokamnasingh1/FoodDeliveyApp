// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const sendWhatsAppOTP = require('../utils/sendWhatsAppOTP');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const otpStore = {};

// 1. Send OTP via WhatsApp
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[phone] = otp;

  try {
    console.log("Sending OTP to:", phone); // ✅ log the incoming phone number
    await sendWhatsAppOTP(phone, otp);     // ✅ use passed phone
    res.json({ message: 'OTP sent via WhatsApp!' });
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});


// 2. Verify OTP and return user + token
// 2. Verify OTP and mark user as verified + return token
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] === otp) {
    delete otpStore[phone];

    try {
      // ✅ Find and update the user as verified
      const user = await User.findOneAndUpdate(
        { phone },
        { verified: true },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // ✅ Generate token
      const token = jwt.sign({ userId: user._id }, 'SECRET123', { expiresIn: '1h' });

      res.json({
        success: true,
        message: '✅ OTP verified',
        user: { name: user.name, phone: user.phone, verified: user.verified },
        token,
      });
    } catch (err) {
      console.error('❌ Verification error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(400).json({ message: '❌ Invalid OTP' });
  }
});


// 3. Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, phone });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;








