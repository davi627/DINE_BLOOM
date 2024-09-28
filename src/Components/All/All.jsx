import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './All.css';

const All = () => {
  const [flowerItems, setFlowerItems] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

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

  return (
    <div>
      <h1>Flowers</h1>
      <div className="flower-gallery">
        {flowerItems.map((flower) => (
          <div key={flower._id} className="flower-card">
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
        <div className="popup">
          <div className="popup-content">
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
              <button
                className="checkout-btn"
                onClick={() =>
                  alert(
                    `You ordered ${quantity} ${selectedFlower.name} for ${totalPrice} KES`
                  )
                }
              >
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
    </div>
  );
};

export default All;
