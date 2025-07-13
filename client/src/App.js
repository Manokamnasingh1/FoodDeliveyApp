
// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
//mport { useAuth } from './context/AuthContext'; // ✅ Add this
import ProtectedRoute from './ProtectedRoute'; // ✅ Import ProtectedRoute

import ProfilePage from './Components/ProfilePage';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AdminAddRestaurant from './Components/AdminAddRestaurant';
import PlaceOrder from './Components/PlaceOrder';
import CartPage from './Components/CartPage';
import PlaceOrderForm from './Components/PlaceOrderForm';
import OrderSuccess from './Components/OrderSuccess';
import LoginPhone from './Components/LoginPhone';
import SignupForm from './Components/SignupForm';
import AccountPrompt from './Components/AccountPrompt';
import AdminLogin from './Components/AdminLogin';
import AdminUserPage from './Components/AdminUserPage';
import AdminOrderPage from './Components/AdminOrderPage';
import AdminDashboard from './Components/AdminDashboard';



import ProtectedAdminRoute from './Components/ProtectedAdminRoute'; // ✅ Import ProtectedAdminRoute


function App() {
  
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
         
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginPhone />} />
            
             <Route
  path="/account"
  element={
   
      <AccountPrompt />
    
  }
/>




            <Route path="/order-success/:paymentId" element={<OrderSuccess />} />

            <Route
              path="/place-order-form"
              element={
                <ProtectedRoute>
                  <PlaceOrderForm />
                </ProtectedRoute>
              }
            />
            
            {/* ✅ Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                 <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path = "/admin/add-restaurant"
              element={
                <ProtectedAdminRoute>
                <AdminAddRestaurant />
                </ProtectedAdminRoute>
              }
            />




            <Route
              path="/admin/users"
              element={
                <ProtectedAdminRoute>
                  <AdminUserPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedAdminRoute>
                  <AdminOrderPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
             path="/profile"
             element={
               <ProtectedRoute>
               <ProfilePage />
               </ProtectedRoute>
              }
            />

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;





