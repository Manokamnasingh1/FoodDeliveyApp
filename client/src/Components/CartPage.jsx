// client/src/Components/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './cart.css';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRedirectToOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
       navigate('/place-order-form'); 
    
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, i) => (
              <li key={i} className="cart-item">
                <div>
                  <strong>{item.name}</strong> - ₹{item.price} × {item.quantity}
                </div>
                <div className="qty-buttons">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p className="total">Total: ₹{totalPrice.toFixed(2)}</p>

          <button className="place-order-btn" onClick={handleRedirectToOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;






