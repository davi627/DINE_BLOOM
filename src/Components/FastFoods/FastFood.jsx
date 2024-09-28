import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FastFood.css';

const FastFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

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
              <button
                className="checkout-btn"
                onClick={() =>
                  alert(
                    `You ordered ${quantity} ${selectedFood.name} for ${totalPrice} KES`
                  )
                }
              >
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
    </div>
  );
};

export default FastFood;
