import React from 'react';
import './Hero.css';
import res from '../../assets/res5.jpg';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <img src={res} alt="Bloom" />
        <h1>A List Liqour, Bar, and Restaurant</h1>
        <div className="underline"></div>
        <h2> Once upon a Dream</h2>
        <a
          href="https://wa.me/0745404934"
          className="whatsapp-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <button
          className="order-button"
          onClick={() =>
            (window.location.href =
              'https://glovoapp.com/ke/en/thika/food-top-the-roaming-chef-thk/')
          }
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
