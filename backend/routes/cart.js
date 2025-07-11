// routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const router = express.Router();

// Add to cart
router.post('/cart', async (req, res) => {
  try {
    const { foodId, name, price } = req.body;

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [] });

    const existingItem = cart.items.find(item => item.foodId.toString() === foodId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ foodId, name, price });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Get cart
router.get('/cart', async (req, res) => {
  const cart = await Cart.findOne();
  res.json(cart || { items: [] });
});

// Place order
router.post('/order', async (req, res) => {
  try {
    const { address } = req.body;
    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const order = new Order({ items: cart.items, address });
    await order.save();

    await Cart.deleteMany(); // Clear cart after order
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
