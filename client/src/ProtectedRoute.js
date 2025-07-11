// client/src/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Not logged in → redirect to account page
    return <Navigate to="/account" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;










