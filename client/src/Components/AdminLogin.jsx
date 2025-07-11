import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ If already logged in, redirect to dashboard
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // ✅ Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // ✅ Hardcoded admin credentials
    if (trimmedUsername === 'Manokamna' && trimmedPassword === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminUsername', trimmedUsername);
      navigate('/admin/dashboard');
    } else {
      setError('❌ Invalid admin credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="admin-login-form">
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Enter Admin Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login as Admin</button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
};

export default AdminLogin;


