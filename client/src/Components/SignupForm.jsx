import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData);
      setMessage('✅ Signup successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('❌ Signup failed. User may already exist.');
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && (
        <p className={message.includes('✅') ? 'success' : 'error'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SignupForm;



