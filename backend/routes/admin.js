const express = require('express');
const multer = require('multer');
const path = require('path');
const FoodItem = require('../models/FoodItem');
const { isAdmin } = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Add a new food item (no restaurant)
router.post('/food', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const foodItem = new FoodItem({
      name,
      price,
      description,
      image: imagePath
    });

    await foodItem.save();
    res.status(201).json({ message: 'Food item added successfully', foodItem });
  } catch (err) {
    console.error('Error adding food:', err);
    res.status(500).json({ error: 'Failed to add food item' });
  }
});

// ✅ Get total users
router.get('/stats/users', isAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
});

// ✅ Get total orders
router.get('/stats/orders', isAdmin, async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ totalOrders: count });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch order count' });
  }
});

// ✅ Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});






// ✅ Get all food items
router.get('/foods', async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

module.exports = router;










