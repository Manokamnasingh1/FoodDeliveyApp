const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { sendToAdmin, sendToUser } = require('../utils/sendWhatsApp');

router.post('/', async (req, res) => {
  try {
    const { name, phone, street, cartItems, payment } = req.body;

    const order = new Order({ name, phone, street, cartItems, payment });
    await order.save();

    const itemsText = cartItems.map(item => `• ${item.name} × ${item.quantity}`).join('\n');

    const adminMessage = `
🍽️ *New Order Received!*

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${street}
💰 Amount: ₹${payment.amount}
🧾 Payment ID: ${payment.transactionId}

📦 Items:
${itemsText}
    `.trim();

    const userMessage = `
✅ Hi ${name}, your order has been placed successfully!
🧾 Payment ID: ${payment.transactionId}
💰 Total Paid: ₹${payment.amount}

Thank you for ordering from FoodApp! 🍕
    `.trim();

    await sendToAdmin(adminMessage);
    await sendToUser(userMessage, phone);

    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Order saving failed:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

// ✅ Get orders by user phone
router.get('/user/:phone', async (req, res) => {
  try {
    const orders = await Order.find({ phone: req.params.phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// ✅ Admin: Get all orders
router.get('/admin/all', async (req, res) => {
  try {
    if (req.headers['x-admin'] !== 'true') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching all orders:', error);
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
});

// ✅ Admin: Delete order
// ✅ User: Cancel order by order ID (used from ProfilePage)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('❌ Error deleting order:', error);
    res.status(500).json({ message: 'Failed to cancel order' });
  }
});


module.exports = router;


