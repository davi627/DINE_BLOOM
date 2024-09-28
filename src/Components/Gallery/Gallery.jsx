import React, { useEffect, useState } from 'react';
import './Gallery.css';
import dine1 from '../../assets/dine1.jpg';
import dine2 from '../../assets/dine2.jpg';
import dine3 from '../../assets/dine3.jpg';
import dine4 from '../../assets/dine4.jpg';
import dine5 from '../../assets/dine5.jpg';
import dine6 from '../../assets/dine6.jpg';
import dine7 from '../../assets/dine7.jpg';
import fast1 from '../../assets/fast1.jpg';

const Gallery = () => {
  const images = [dine1, dine2, dine3, dine4, dine5, dine6, dine7, fast1];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 4 >= images.length ? 0 : prevIndex + 1
      );
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="gallery-container">
      <h2>Get A Variety Of Meals</h2>
      <div className="gallery">
        <div
          className="gallery-slider"
          style={{
            transform: `translateX(-${currentIndex * (100 / 4)}%)`,
          }}
        >
          {images.concat(images.slice(0, 4)).map((img, index) => (
            <img key={index} src={img} alt={`meal-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
