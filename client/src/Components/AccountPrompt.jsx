import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPrompt.css';

const AccountPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="account-prompt-container">
      <div className="account-card">
        <img
          src="images/login-illustration.jpg"
          alt="Login or Signup"
          className="account-image"
        />

        <p>To place your order now, log in to your existing account or sign up.</p>
     


        <div className="auth-buttons">
          <div>
            <p>Have an account?</p>
            <button onClick={() => navigate('/login')} className="login-btn">LOG IN</button>
          </div>
          <div>
            <p>New to FoodApp?</p>
            <button onClick={() => navigate('/signup')} className="signup-btn">SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPrompt;
