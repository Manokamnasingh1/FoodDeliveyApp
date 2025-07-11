const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  street: String,
  cartItems: [
    {
      name: String,
      price: Number,
      description: String,
      quantity: Number
    }
  ],
  payment: {
    status: String,
    method: String,
    amount: Number,
    transactionId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Check if model already exists before creating
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);



