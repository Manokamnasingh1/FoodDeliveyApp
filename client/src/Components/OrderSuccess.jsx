import React from 'react';
import { useParams } from 'react-router-dom';
import './orderSuccess.css';

const OrderSuccess = () => {
  const { paymentId } = useParams();

  return (
    <div className="order-success-wrapper">
      <div className="order-success-card">
        <h2>🎉 Order Confirmed!</h2>
        <p>Thank you for your order.</p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
      </div>
    </div>
  );
};

export default OrderSuccess;

