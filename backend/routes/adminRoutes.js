const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.post('/food', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file.path; // ✅ Cloudinary URL

    const newFood = new Food({ name, price, description, image });
    await newFood.save();

    res.status(201).json({ message: 'Food item added', food: newFood });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload food item' });
  }
});
