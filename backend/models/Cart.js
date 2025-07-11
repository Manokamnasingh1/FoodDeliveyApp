// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
