import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditFlowers.css';

const EditFlowers = () => {
  const [flowers, setFlowers] = useState([]);

  // Fetch flower items from the backend
  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/flowers/flowers'
        );
        setFlowers(response.data);
      } catch (err) {
        console.error('Error fetching flower items:', err);
      }
    };

    fetchFlowers();
  }, []);

  // Update availability status
  const toggleAvailability = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/flowers/flowers/${id}`,
        {
          available: !currentStatus,
        }
      );

      if (response.data.flower) {
        setFlowers((prevFlowers) =>
          prevFlowers.map((flower) =>
            flower._id === id ? response.data.flower : flower
          )
        );
      }
    } catch (err) {
      console.error('Error updating availability:', err);
    }
  };

  // Delete flower item
  const deleteFlower = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/flowers/flowers/${id}`);
      setFlowers((prevFlowers) =>
        prevFlowers.filter((flower) => flower._id !== id)
      );
    } catch (err) {
      console.error('Error deleting flower item:', err);
    }
  };

  return (
    <div className="edit-flowers-container">
      <h1>Edit Flowers</h1>
      <div className="flower-list">
        {flowers.map((flower) => (
          <div className="flower-card" key={flower._id}>
            <img
              src={`http://localhost:3000/${flower.img}`}
              alt={flower.name}
              className="flower-img"
            />
            <div className="flower-details">
              <h3>{flower.name}</h3>
              <p>Price: ${flower.price}</p>
              <p>Status: {flower.available ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() => toggleAvailability(flower._id, flower.available)}
                className={`availability-btn ${
                  flower.available ? 'available' : 'not-available'
                }`}
              >
                {flower.available ? 'Not Available' : 'Available'}
              </button>
              <button
                onClick={() => deleteFlower(flower._id)}
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

export default EditFlowers;
