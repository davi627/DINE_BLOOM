import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; // Add your CSS for card styling

const Product = () => {
  const [foods, setFoods] = useState([]);

  // Fetch food items from the backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foods/foods');
        setFoods(response.data);
      } catch (err) {
        console.error('Error fetching food items:', err);
      }
    };

    fetchFoods();
  }, []);

  // Update availability status
  const toggleAvailability = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:3000/foods/foods/${id}`, {
        available: !currentStatus,
      });
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === id ? { ...food, available: !currentStatus } : food
        )
      );
    } catch (err) {
      console.error('Error updating availability:', err);
    }
  };

  // Delete food item
  const deleteFood = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/foods/foods/${id}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
    } catch (err) {
      console.error('Error deleting food item:', err);
    }
  };

  return (
    <div className="product-container">
      <h1>Food Items</h1>
      <div className="food-list">
        {foods.map((food) => (
          <div className="food-card" key={food._id}>
            <img
              src={`http://localhost:3000/${food.img}`}
              alt={food.name}
              className="food-img"
            />
            <div className="food-details">
              <h3>{food.name}</h3>
              <p>Price: ${food.price}</p>
              <p>Status: {food.available ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() => toggleAvailability(food._id, food.available)}
                className={`availability-btn ${
                  food.available ? 'available' : 'not-available'
                }`}
              >
                {food.available ? ' Not Available' : 'Available'}
              </button>
              <button
                onClick={() => deleteFood(food._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
