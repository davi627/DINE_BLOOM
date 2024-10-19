import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './All.css';

const All = () => {
  const [flowerItems, setFlowerItems] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Fetch flower items from the backend
  useEffect(() => {
    const fetchFlowerItems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/flowers/flowers');
        setFlowerItems(res.data);
      } catch (err) {
        console.error('Error fetching flower items:', err);
      }
    };

    fetchFlowerItems();
  }, []);

  const handleOrder = (flower) => {
    setSelectedFlower(flower);
    setQuantity(1);
    setTotalPrice(flower.price);
  };

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    setTotalPrice(selectedFlower.price * qty);
  };

  const handleCheckout = () => {
    setShowMpesaModal(true); // Show MPESA modal for number input
  };

  const handleMpesaSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/mpesa/stkpush', // Adjusted to the correct endpoint
        {
          amount: totalPrice, // Automatically pick the total price
          phoneNumber: mpesaNumber, // Send the mpesaNumber to the backend
        }
      );

      if (response.data) {
        setPaymentStatus('Payment initiated. Please check your phone.');
      } else {
        setPaymentStatus('Payment failed. Try again.');
      }

      setShowMpesaModal(false); // Close the modal after submission
      setMpesaNumber(''); // Reset the mpesa number input
    } catch (error) {
      console.error('Error initiating MPESA payment:', error);
      setPaymentStatus('Payment failed. Try again.');
    }
  };

  return (
    <div>
      <h1 className="all-flowers-header">Flowers</h1>
      <div className="all-flower-gallery">
        {flowerItems.map((flower) => (
          <div key={flower._id} className="all-flower-card">
            <img
              src={`http://localhost:3000/${flower.img}`}
              alt={flower.name}
            />
            <h2>{flower.name}</h2>
            <p style={{ color: flower.available ? 'green' : 'red' }}>
              {flower.available ? 'Available' : 'Not Available'}
            </p>
            <p>Price: {flower.price} KES</p>
            <button
              disabled={!flower.available}
              onClick={() => handleOrder(flower)}
            >
              Order
            </button>
          </div>
        ))}
      </div>

      {selectedFlower && (
        <div className="all-popup">
          <div className="all-popup-content">
            <h3>Order {selectedFlower.name}</h3>
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </label>
            <p>Total Price: {totalPrice} KES</p>
            <div className="buttons">
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
              <button
                className="close-btn"
                onClick={() => setSelectedFlower(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showMpesaModal && (
        <div className="all-popup">
          <div className="all-popup-content">
            <h3>Enter MPESA Number</h3>
            <p>Total Amount: {totalPrice} KES</p> {/* Display total price */}
            <input
              type="text"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              placeholder="e.g 254712345678"
            />
            <div className="buttons">
              <button className="checkout-btn" onClick={handleMpesaSubmit}>
                Pay Now
              </button>
              <button
                className="close-btn"
                onClick={() => setShowMpesaModal(false)}
              >
                Cancel
              </button>
            </div>
            {paymentStatus && <p>{paymentStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default All;
