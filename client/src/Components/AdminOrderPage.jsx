import React, { useEffect, useState } from 'react';
import './AdminOrderPage.css'; // Assuming you have a CSS file for styling

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/admin/all`, {
      headers: {
        'Content-Type': 'application/json',
        'x-admin': 'true'
      }
    });

        if (!res.ok) throw new Error('Failed to fetch orders');

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = searchPhone.trim()
    ? orders.filter((order) =>
        (order.phone || '').toString().includes(searchPhone.trim())
      )
    : orders;

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="admin-orders-page">
      <h2>All Orders (Admin View)</h2>

      <input
        type="text"
        placeholder="Search by phone number..."
        value={searchPhone}
        onChange={(e) => setSearchPhone(e.target.value)}
        className="admin-search-input"
      />

      {filteredOrders.length === 0 ? (
        <p>No matching orders found.</p>
      ) : (
        <div className="orders-container">
          {filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h4>{order.name || 'N/A'}</h4>
              <p>
  <span role="img" aria-label="phone">📞</span> {order.phone || 'N/A'}
</p>
<p>
  <span role="img" aria-label="receipt">🧾</span> <strong>ID:</strong> {order._id}
</p>
<p>
  <span role="img" aria-label="clock">🕒</span> {new Date(order.createdAt).toLocaleString()}
</p>
<p>
  <span role="img" aria-label="money">💰</span> ₹{order.payment?.amount || 'N/A'}
</p>

              <p><strong>Status:</strong>{' '}
                <span className={order.payment?.status === 'success' ? 'status-success' : 'status-pending'}>
                  {order.payment?.status || 'Pending'}
                </span>
              </p>
              <p><strong>Items:</strong><br />
                {order.cartItems?.map(item => `${item.name} (x${item.quantity})`).join(', ') || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;









