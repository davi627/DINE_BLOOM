import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desserts.css';

const Desserts = () => {
  const [dessertsItems, setDessertsItems] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

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
              <button
                className="checkout-btn"
                onClick={() =>
                  alert(
                    `You ordered ${quantity} ${selectedDessert.name} for ${totalPrice} KES`
                  )
                }
              >
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
    </div>
  );
};

export default Desserts;
