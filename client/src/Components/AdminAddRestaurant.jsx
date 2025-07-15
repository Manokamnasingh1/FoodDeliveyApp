import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Adminfood.css';

function AdminManageFoods() {
  const [food, setFood] = useState({
    name: '',
    price: '',
    description: '',
    imageFile: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleChange = (field, value) => {
    setFood(prev => ({ ...prev, [field]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', food.name);
    formData.append('price', food.price);
    formData.append('description', food.description);
    formData.append('image', food.imageFile);

     try {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/food`, {
    method: 'POST',
    headers: {
      'x-admin': 'true',
    },
    body: formData,
  });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Food item added successfully!');
        setFood({ name: '', price: '', description: '', imageFile: null });
      } else {
        alert(`❌ Error: ${data.error || 'Failed to add food item'}`);
      }
    } catch (err) {
      alert('❌ Network error while adding food item');
      console.error(err);
    }
  };

  return (
    <div > {/* ✅ Layout container */}
      

      <form onSubmit={submitHandler} className="admin-form">
        <h2>Add Food Item</h2>

        <input
          type="text"
          placeholder="Food Name"
          value={food.name}
          onChange={e => handleChange('name', e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={food.price}
          onChange={e => handleChange('price', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={food.description}
          onChange={e => handleChange('description', e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={e => handleChange('imageFile', e.target.files[0])}
          required
        />

        <button className="add-btn" type="submit">
          Submit Food Item
        </button>
      </form>
    </div>
  );
}

export default AdminManageFoods;









