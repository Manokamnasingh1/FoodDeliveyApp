import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './placeOrderForm.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrderForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', street: '' });
  const [message, setMessage] = useState('');
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // 🔐 Check login status on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.phone) {
      navigate('/account'); // redirect if not logged in
    } else {
      setFormData(prev => ({
        ...prev,
        phone: user.phone,
        name: user.name || ''
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = (order) => {
    const options = {
      key: 'rzp_test_Cd0AlB8ZRArOAk',
      amount: order.amount,
      currency: 'INR',
      name: 'FoodApp',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response) {
        try {
          const paymentInfo = {
            status: 'success',
            method: 'Razorpay',
            amount: order.amount / 100,
            transactionId: response.razorpay_payment_id
          };

          const res = await axios.post('http://localhost:5000/api/orders', {
            ...formData,
            cartItems,
            payment: paymentInfo
          });

          clearCart();
          setFormData({ name: '', phone: '', street: '' });
          navigate(`/order-success/${res.data.payment.transactionId}`);
        } catch (error) {
          console.error('Order saving failed:', error);
          setMessage('❌ Failed to save order.');
        }
      },
      prefill: {
        name: formData.name,
        contact: formData.phone
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('🛒 Your cart is empty!');
      return;
    }

    try {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const res = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: total
      });

      loadRazorpay(res.data);
    } catch (err) {
      console.error(err);
      setMessage('❌ Payment initialization failed.');
    }
  };

  return (
    <div className="place-order-container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit} className="place-order-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          readOnly // 👈 Prevent editing
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Order & Pay</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default PlaceOrderForm;





