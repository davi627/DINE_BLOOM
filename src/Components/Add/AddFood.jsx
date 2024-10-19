import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AddFood.css';

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    available: true,
  });
  const [file, setFile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu

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
      <div className="topbar">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776; {/* Hamburger icon */}
        </div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/addfood"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Foods
          </Link>
          <Link
            to="/adddrinks"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Drinks
          </Link>
          <Link
            to="/adddesserts"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Desserts
          </Link>
          <Link
            to="/addflowers"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Flowers
          </Link>
          <Link
            to="/products"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Edit Meals
          </Link>
          <Link
            to="/Edrinks"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Edit Drinks
          </Link>
          <Link
            to="/editdesserts"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Edit Desserts
          </Link>
          <Link
            to="/editflowers"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Edit Flowers
          </Link>
          <Link
            to="/logout"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          ></Link>
        </nav>
      </div>

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
