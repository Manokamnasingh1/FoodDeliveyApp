import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaConciergeBell, FaHome, FaUserShield,
  FaShoppingBag, FaShoppingCart, FaUserCircle,
  FaBars, FaTimes
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
    closeMenu();
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/home');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand and toggle */}
        <div className="navbar-brand">
          <h3 className="logo">
            <FaConciergeBell className="logo-icon" />
            FoodApp
          </h3>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links */}
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/home" className="icon-link"><FaHome className="icon" /> Home</Link>
          <Link
          to="#"
          className="icon-link"
          onClick={(e) => {
          e.preventDefault();
          const isAdmin = localStorage.getItem('isAdmin');
          navigate(isAdmin === 'true' ? '/admin/dashboard' : '/admin-login');
        }}
   >
          <FaUserShield className="icon" /> Admin
           </Link>
        
          <Link to="/cart" className="icon-link">
  <FaShoppingCart className="icon" />
  Cart (
    <span
      style={{
        color: cartItems.reduce((sum, item) => sum + item.quantity, 0) > 0 ? 'red' : 'inherit',
        fontWeight: 'bold'
      }}
    >
      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    </span>
  )
</Link>

          {user ? (
  <>
    <button
      className="icon-link profile-btn"
      onClick={() => navigate('/profile')}
    >
      <FaUserCircle className="icon" />
      {user.name}
    </button>
    <button className="icon-link logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </>
) : (
  <Link to="/account" className="icon-link">
    <FaUserCircle className="icon" /> Login
  </Link>
)}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;






