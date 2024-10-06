import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desserts.css';

const Desserts = () => {
  const [dessertsItems, setDessertsItems] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Fetch dessert items from the backend
  useEffect(() => {
    const fetchDessertsItems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/desserts/desserts');
        setDessertsItems(res.data);
      } catch (err) {
        console.error('Error fetching dessert items:', err);
      }
    };

    fetchDessertsItems();
  }, []);

  const handleOrder = (dessert) => {
    setSelectedDessert(dessert);
    setQuantity(1);
    setTotalPrice(dessert.price);
  };

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    setTotalPrice(selectedDessert.price * qty);
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
      <h1>Desserts</h1>
      <div className="food-gallery">
        {dessertsItems.map((dessert) => (
          <div key={dessert._id} className="food-card">
            <img
              src={`http://localhost:3000/${dessert.img}`}
              alt={dessert.name}
            />
            <h2>{dessert.name}</h2>
            <p style={{ color: dessert.available ? 'green' : 'red' }}>
              {dessert.available ? 'Available' : 'Not Available'}
            </p>
            <p>Price: {dessert.price} KES</p>
            <button
              disabled={!dessert.available}
              onClick={() => handleOrder(dessert)}
            >
              Order
            </button>
          </div>
        ))}
      </div>

      {selectedDessert && (
        <div className="popup">
          <div className="popup-content">
            <h3>Order {selectedDessert.name}</h3>
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
                onClick={() => setSelectedDessert(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showMpesaModal && (
        <div className="mpesa-modal popup">
          <div className="modal-content popup-content">
            <h3>Enter MPESA Number</h3>
            <p>Total Amount: {totalPrice} KES</p> {/* Display total price */}
            <input
              type="text"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              placeholder="e.g 254745404934"
            />
            <div className="buttons">
              <button onClick={handleMpesaSubmit}>Submit</button>
              <button onClick={() => setShowMpesaModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Desserts;
