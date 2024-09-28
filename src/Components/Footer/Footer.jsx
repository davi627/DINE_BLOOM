import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Importing icons
import './Footer.css'; // Importing the CSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <p className="footer-copyright">
        © 2022 Dine & Bloom. All rights reserved.
      </p>
      <ul className="footer-links">
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Press</li>
        <li>Terms & Conditions</li>
      </ul>
      <p className="footer-developer">Developed By Mbita David</p>
      <div className="footer-social-icons">
        <a
          href="https://www.facebook.com/david mbita"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.instagram.com/dinebloom/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://x.com/davidmbita001"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
