// components/PlaceOrder.js
import React, { useEffect, useState } from 'react';

function PlaceOrder() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const orderHandler = async () => {
    const order = {
      user: 'user_id_here',
      restaurant: 'restaurant_id_here',
      items: [{ name: 'Pizza', qty: 1, price: 300 }],
      totalPrice: 300,
      deliveryLocation: {
        type: 'Point',
        coordinates: [coords.lng, coords.lat]
      }
    };
    await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    alert('Order Placed');
  };

  return (
    <div>
      <p>Location: {coords ? `${coords.lat}, ${coords.lng}` : 'Loading...'}</p>
      <button onClick={orderHandler}>Place Order</button>
    </div>
  );
}
export default PlaceOrder;

