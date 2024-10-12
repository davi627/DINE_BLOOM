import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditDesserts.css'; // Add CSS for styling if necessary

const EditDesserts = () => {
  const [desserts, setDesserts] = useState([]);

  // Fetch dessert items from the backend
  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/desserts/desserts'
        );
        setDesserts(response.data);
      } catch (err) {
        console.error('Error fetching dessert items:', err);
      }
    };

    fetchDesserts();
  }, []);

  // Update availability status
  const toggleAvailability = async (id, currentStatus) => {
    try {
      // Send the PUT request to the backend
      const response = await axios.put(
        `http://localhost:3000/desserts/desserts/${id}`,
        {
          available: !currentStatus,
        }
      );

      // Check if the response data has the updated dessert
      if (response.data.dessert) {
        setDesserts((prevDesserts) =>
          prevDesserts.map((dessert) =>
            dessert._id === id ? response.data.dessert : dessert
          )
        );
      }
    } catch (err) {
      console.error('Error updating availability:', err);
    }
  };

  // Delete dessert item
  const deleteDessert = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/desserts/desserts/${id}`);
      setDesserts((prevDesserts) =>
        prevDesserts.filter((dessert) => dessert._id !== id)
      );
    } catch (err) {
      console.error('Error deleting dessert item:', err);
    }
  };

  return (
    <div className="edit-desserts-container">
      <h1>Edit Desserts</h1>
      <div className="dessert-list">
        {desserts.map((dessert) => (
          <div className="dessert-card" key={dessert._id}>
            <img
              src={`http://localhost:3000/${dessert.img}`}
              alt={dessert.name}
              className="dessert-img"
            />
            <div className="dessert-details">
              <h3>{dessert.name}</h3>
              <p>Price: ${dessert.price}</p>
              <p>Status: {dessert.available ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() =>
                  toggleAvailability(dessert._id, dessert.available)
                }
                className={`availability-btn ${
                  dessert.available ? 'available' : 'not-available'
                }`}
              >
                {dessert.available ? 'Not Available' : 'Available'}
              </button>
              <button
                onClick={() => deleteDessert(dessert._id)}
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

export default EditDesserts;
