import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AddFood.css';

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    available: true,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', foodData.name);
    formData.append('price', foodData.price);
    formData.append('available', foodData.available);
    formData.append('img', file);

    try {
      await axios.post('http://localhost:3000/foods/addfood', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Food item added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding food item');
    }
  };

  return (
    <div>
      {/* Top bar outside the form container */}
      <div className="topbar">
        <Link to="/addfood" className="nav-link">
          Foods
        </Link>
        <Link to="/adddrinks" className="nav-link">
          Drinks
        </Link>
        <Link to="/adddesserts" className="nav-link">
          Desserts
        </Link>
        <Link to="/addflowers" className="nav-link">
          Flowers
        </Link>
      </div>

      {/* Form container below the top bar */}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={foodData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Available:
            <input
              type="checkbox"
              name="available"
              checked={foodData.available}
              onChange={() =>
                setFoodData({ ...foodData, available: !foodData.available })
              }
            />
          </label>
          <label>
            Upload Image:
            <input type="file" onChange={handleFileChange} required />
          </label>
          <button type="submit">Add Food</button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
