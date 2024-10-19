import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        You will find us halfway between Nyeri & Nyahururu, on a hill
        overlooking Mt Kenya & the Laikipia Plains. Those who visit here always
        see it as an ideal destination for those in search of a unique getaway
        in the countryside, ideal for rejuvenation, relaxation, meetings &
        special events- weddings, honeymoons & parties and for emersion in the
        ARTS.
      </p>
      <hr className="footer-line" />
      <div className="footer-icons">
        <a href="mailto:davidmbita001@gmail.com" className="footer-icon">
          <FaEnvelope />
          <span>Email Us</span>
        </a>

        <a href="tel:+254745404934" className="footer-icon">
          <FaPhoneAlt />
          <span>Call Us</span>
        </a>

        <a
          href="https://www.google.com/maps?q=Lang'ata"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaMapMarkerAlt />
          <span>Directions</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
