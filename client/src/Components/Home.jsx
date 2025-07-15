import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { useCart } from '../context/CartContext';
import bgImage from '../assets/images/desi-food-bg.jpg';


const Home = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
   axios.get(`${process.env.REACT_APP_API_URL}/api/admin/foods`)
      .then(res => setFoods(res.data))
      .catch(err => console.error('Failed to fetch food items:', err));
  }, []);

  const handleAddToOrder = (food) => {
    addToCart(food);
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="homepage-bg"
      style={{ backgroundImage: `url(${bgImage})` }} // ✅ dynamic background
    >
      <div className="container">
        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search by food name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <h2 className="title">Available Food Items</h2>

        {filteredFoods.length === 0 ? (
          <p>No food items match your search.</p>
        ) : (
          <div className="card-grid">
            {filteredFoods.map((food) => (
              <div key={food._id} className="food-card">
                {food.image && (
                 <img
  src={`https://foodapp-backend-h3fu.onrender.com${food.image}`}
  alt={food.name}
  className="food-image"
/>

                )}
                <div className="food-content">
                  <div className="food-header">
                    <h3 className="food-name">{food.name}</h3>
                    <div className="veg-icon"></div>
                  </div>

                  <div className="food-header">
                    <p className="food-price">₹{food.price}</p>
                    <div className="rating">10% off</div>
                  </div>

                  <div className="food-footer">
                    <p className="food-description">{food.description}</p>
                    <span className="rating">
                      <span role="img" aria-label="star">⭐</span> 4.5
                    </span>
                  </div>

                  <button
                    className="add-btn"
                    onClick={() => handleAddToOrder(food)}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;















