import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Drinks.css';

const Drinks = () => {
  const [drinksItems, setDrinksItems] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch drink items from the backend
  useEffect(() => {
    const fetchDrinksItems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/drinks/drinks');
        setDrinksItems(res.data);
      } catch (err) {
        console.error('Error fetching drink items:', err);
      }
    };

    fetchDrinksItems();
  }, []);

  const handleOrder = (drinks) => {
    setSelectedDrinks(drinks);
    setQuantity(1);
    setTotalPrice(drinks.price);
  };

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    setTotalPrice(selectedDrinks.price * qty);
  };

  return (
    <div>
      <h1>Drinks</h1>
      <div className="food-gallery">
        {drinksItems.map((drinks) => (
          <div key={drinks._id} className="food-card">
            <img
              src={`http://localhost:3000/${drinks.img}`} // Correct path to image
              alt={drinks.name}
            />
            <h2>{drinks.name}</h2>
            <p style={{ color: drinks.available ? 'green' : 'red' }}>
              {drinks.available ? 'Available' : 'Not Available'}
            </p>
            <p>Price: {drinks.price} KES</p>
            <button
              disabled={!drinks.available} // Fix to disable button if not available
              onClick={() => handleOrder(drinks)}
            >
              Order
            </button>
          </div>
        ))}
      </div>

      {selectedDrinks && (
        <div className="popup">
          <div className="popup-content">
            <h3>Order {selectedDrinks.name}</h3>
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
              <button
                className="checkout-btn"
                onClick={() =>
                  alert(
                    `You ordered ${quantity} ${selectedDrinks.name} for ${totalPrice} KES`
                  )
                }
              >
                Checkout
              </button>
              <button
                className="close-btn"
                onClick={() => setSelectedDrinks(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drinks;
