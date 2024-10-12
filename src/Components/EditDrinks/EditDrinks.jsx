import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditDrinks.css'; // Add CSS for styling if necessary

const EditDrinks = () => {
  const [drinks, setDrinks] = useState([]);

  // Fetch drink items from the backend
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/drinks/drinks');
        setDrinks(response.data);
      } catch (err) {
        console.error('Error fetching drink items:', err);
      }
    };

    fetchDrinks();
  }, []);

  // Update availability status
  const toggleAvailability = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:3000/drinks/drinks/${id}`, {
        available: !currentStatus,
      });
      setDrinks((prevDrinks) =>
        prevDrinks.map((drink) =>
          drink._id === id ? { ...drink, available: !currentStatus } : drink
        )
      );
    } catch (err) {
      console.error('Error updating availability:', err);
    }
  };

  // Delete drink item
  const deleteDrink = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/drinks/drinks/${id}`);
      setDrinks((prevDrinks) => prevDrinks.filter((drink) => drink._id !== id));
    } catch (err) {
      console.error('Error deleting drink item:', err);
    }
  };

  return (
    <div className="edit-drinks-container">
      <h1>Edit Drinks</h1>
      <div className="drink-list">
        {drinks.map((drink) => (
          <div className="drink-card" key={drink._id}>
            <img
              src={`http://localhost:3000/${drink.img}`}
              alt={drink.name}
              className="drink-img"
            />
            <div className="drink-details">
              <h3>{drink.name}</h3>
              <p>Price: ${drink.price}</p>
              <p>Status: {drink.available ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() => toggleAvailability(drink._id, drink.available)}
                className={`availability-btn ${
                  drink.available ? 'available' : 'not-available'
                }`}
              >
                {drink.available ? 'Not Available' : ' Available'}
              </button>
              <button
                onClick={() => deleteDrink(drink._id)}
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

export default EditDrinks;
