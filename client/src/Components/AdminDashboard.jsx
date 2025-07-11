// client/src/Components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import AdminUserPage from './AdminUserPage';
import AdminOrderPage from './AdminOrderPage';
import AdminAddRestaurant from './AdminAddRestaurant';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [activeView, setActiveView] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem('adminUsername'); // ✅ Get stored name

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUsername');
    navigate('/admin-login');
  };
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch('http://localhost:5000/api/admin/stats/users', {
          headers: { 'x-admin': 'true' }
        });
        const userData = await userRes.json();

        const orderRes = await fetch('http://localhost:5000/api/admin/stats/orders', {
          headers: { 'x-admin': 'true' }
        });
        const orderData = await orderRes.json();

        setTotalUsers(userData.totalUsers || 0);
        setTotalOrders(orderData.totalOrders || 0);
      } catch (err) {
        console.error('❌ Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="admin-header">
        <h2>Welcome  {username || 'Admin'}</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-row">
        <div className="card clickable" onClick={() => setActiveView('addRestaurant')}>
          Add Restaurant
        </div>
        <div className="card clickable" onClick={() => setActiveView('users')}>
          Total Users: {totalUsers}
        </div>
        <div className="card clickable" onClick={() => setActiveView('orders')}>
          Total Orders: {totalOrders}
        </div>
      </div>

      {/* Views */}
      <div className="dashboard-content">
        {activeView === 'users' && <AdminUserPage />}
        {activeView === 'orders' && <AdminOrderPage />}
        {activeView === 'addRestaurant' && <AdminAddRestaurant />}
      </div>
    </div>
  );
};

export default AdminDashboard;








