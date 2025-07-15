const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load .env at the top

const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');



const app = express(); // ✅ Must come before using 'app'



// Razorpay payment route (✅ now moved after app is declared)
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/orders'); // your order model route
const authRoutes = require('./routes/auth'); // ✅ ADD THIS LINE


const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api', cartRoutes);
app.use('/api/payment', paymentRoutes);  // ✅ Make sure app is declared before this
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // ✅ ADD THIS ROUTE



// Root route
app.get('/', (req, res) => {
  res.send('🍽️ Food API Server is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});








