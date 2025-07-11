
// client/src/Components/LoginPhone.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPhone.css';

const LoginPhone = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      setMessage('');
      setError('');
      await axios.post('http://localhost:5000/api/auth/send-otp', { phone });
      setOtpSent(true);
      setMessage('📩 OTP sent successfully to your WhatsApp.');
    } catch {
      setError('❌ Failed to send OTP. Please check your phone number.');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { phone, otp });
      const { user, token } = res.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setMessage('✅ Verified successfully. Redirecting...');
      setTimeout(() => navigate('/place-order-form'), 1500);
    } catch {
      setError('❌ Incorrect OTP or expired.');
    }
  };
 
 







  return (
    <div className="login-phone-container">
      <h2>Login via Phone</h2>

      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {!otpSent ? (
        <button onClick={sendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPhone;






