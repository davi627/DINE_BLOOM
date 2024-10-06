import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FastFood.css';

const FastFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Fetch food items from the backend
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/foods/foods');
        setFoodItems(res.data);
      } catch (err) {
        console.error('Error fetching food items:', err);
      }
    };

    fetchFoodItems();
  }, []);

  const handleOrder = (food) => {
    setSelectedFood(food);
    setQuantity(1);
    setTotalPrice(food.price);
  };

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    setTotalPrice(selectedFood.price * qty);
  };

  const handleCheckout = () => {
    setShowMpesaModal(true); // Show MPESA modal for number input
  };

  const handleMpesaSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/mpesa/stkpush', {
        amount: totalPrice, // Automatically pick the total price
        phoneNumber: mpesaNumber, // Send the mpesaNumber to the backend
      });

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
      <h1>Foods</h1>
      <div className="food-gallery">
        {foodItems.map((food) => (
          <div key={food._id} className="food-card">
            <img src={`http://localhost:3000/${food.img}`} alt={food.name} />
            <h2>{food.name}</h2>
            <p style={{ color: food.available ? 'green' : 'red' }}>
              {food.available ? 'Available' : 'Not Available'}
            </p>
            <p>Price: {food.price} KES</p>
            <button
              disabled={!food.available}
              onClick={() => handleOrder(food)}
            >
              Order
            </button>
          </div>
        ))}
      </div>

      {selectedFood && (
        <div className="popup">
          <div className="popup-content">
            <h3>Order {selectedFood.name}</h3>
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
                onClick={() => setSelectedFood(null)}
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
            <p>Total Amount: {totalPrice} KES</p>
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

export default FastFood;
