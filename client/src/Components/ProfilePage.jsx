import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !user.phone) return;

    const fetchOrders = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/user/${user.phone}`);
    const data = await res.json();
    setOrders(data);
  } catch (err) {
    console.error('Failed to fetch user orders:', err);
  }
};


    fetchOrders();
  }, [user]);
   
  const handleCancelOrder = async (orderId) => {
  const confirmed = window.confirm('Are you sure you want to cancel this order?');
  if (!confirmed) return;

  try {
    const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      setOrders(prev => prev.filter(order => order._id !== orderId));
      alert(data.message || 'Order cancelled successfully ✅');
    } else {
      alert(data.message || '❌ Failed to cancel order');
    }
  } catch (err) {
    console.error('Error cancelling order:', err);
    alert('❌ Something went wrong');
  }
};

 

  if (!user) return <p>Please login to view your orders.</p>;

  return (
    <div className="profile-page">
      <h2>Hello, {user.name} 👋</h2>
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul className="order-list">
  {orders.map((order) => (
    <li key={order._id} className="order-item">
      <div className="order-row">
        <div className="order-column">
          <p>
  <span role="img" aria-label="receipt">🧾</span> <strong>Order ID:</strong> {order._id}
</p>
<p>
  <span role="img" aria-label="calendar">📅</span> <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
</p>
<p>
  <span role="img" aria-label="money">💰</span> <strong>Total:</strong> ₹{order.payment?.amount || 'N/A'}
</p>
<p>
  <span role="img" aria-label="package">📦</span> <strong>Status:</strong> {order.payment?.status || 'Pending'}
</p>
<p>
  <span role="img" aria-label="food">🍽️</span> <strong>Items:</strong> {order.cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ')}
</p>

        </div>

        <button
          className="cancel-button"
          onClick={() => handleCancelOrder(order._id)}
        >
         CancelOrder
        </button>
      </div>
    </li>
  ))}
</ul>


      )}
    </div>
  );
};

export default ProfilePage;



