
// client/src/Components/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin === 'true' ? children : <Navigate to="/admin-login" />;
};

export default ProtectedAdminRoute;


