// client/src/Components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', formData);
      setStep(2);
      alert(res.data.message);
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        ...formData,
        otp,
      });
      login(res.data.user);
      navigate('/place-order-form');
    } catch (err) {
      alert('OTP verification failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {step === 1 ? (
        <>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Register;
