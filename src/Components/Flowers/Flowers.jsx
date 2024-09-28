import React, { useState } from 'react';
import './Flowers.css';
import fl1 from '../../assets/fl1.jpg';
import fl2 from '../../assets/fl2.jpg';
import fl3 from '../../assets/fl3.jpg';
import fl4 from '../../assets/fl4.jpg';
import fl5 from '../../assets/fl5.jpg';
import fl6 from '../../assets/fl6.jpg';
import fl7 from '../../assets/fl7.jpg';
import fl8 from '../../assets/fl8.jpg';

const Flowers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [fl1, fl2, fl3, fl4, fl5, fl6, fl7, fl8];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + (images.length - 3)) % (images.length - 3)
    );
  };

  return (
    <div className="flowers-container">
      <h2>Discover Our Unique Flowers</h2>
      <div className="flowers-gallery">
        <button className="nav-button prev" onClick={prevSlide}>
          &lt;
        </button>
        <div
          className="flowers-slider"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Flower ${index + 1}`} />
          ))}
        </div>
        <button className="nav-button next" onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Flowers;
