import React, { useState } from 'react';
import axios from 'axios';

const AddDessert = () => {
  const [drinkData, setDrinkData] = useState({
    name: '',
    price: '',
    available: true,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setDrinkData({ ...drinkData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', drinkData.name);
    formData.append('price', drinkData.price);
    formData.append('available', drinkData.available);
    formData.append('img', file); // Append image file

    try {
      await axios.post('http://localhost:3000/desserts/adddesserts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Dessert item added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding Flower item');
    }
  };

  return (
    <div className="container">
      {/* Add Drink Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={drinkData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={drinkData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={drinkData.available}
            onChange={() =>
              setDrinkData({ ...drinkData, available: !drinkData.available })
            }
          />
        </label>
        <label>
          Upload Image:
          <input type="file" onChange={handleFileChange} required />
        </label>
        <button type="submit">Add Dessert</button>
      </form>
    </div>
  );
};

export default AddDessert;
