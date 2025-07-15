import React, { useEffect, useState } from 'react';
import './AdminUserPage.css';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
    headers: { 'x-admin': 'true' }
  })
    .then(res => res.json())
    .then(data => {
      setUsers(data);
      setFilteredUsers(data);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
    });
}, []);


  useEffect(() => {
    if (!searchPhone) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.phone?.toString().includes(searchPhone)
      );
      setFilteredUsers(filtered);
    }
  }, [searchPhone, users]);

  return (
    <div className="admin-list">
      <h2>All Users</h2>

      <input
        type="text"
        placeholder="Search by phone number"
        value={searchPhone}
        onChange={(e) => setSearchPhone(e.target.value)}
        className="admin-search"
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {filteredUsers.map((user, i) => (
            <li key={i} className="admin-user-card">
              <p>
  <span role="img" aria-label="user">👤</span> <strong>{user.name}</strong>
</p>
<p>
  <span role="img" aria-label="phone">📞</span> {user.phone}
</p>
<p>
  <span role="img" aria-label="email">📧</span> {user.email}
</p>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUserPage;

