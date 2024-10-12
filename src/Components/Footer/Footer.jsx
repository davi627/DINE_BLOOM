import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa';
import './Footer.css';
const Footer = () => {
  const phoneNumber = '+254745404934';

  return (
    <div className="footer-container">
      <p className="footer-copyright">
        © A List Liquor, Bar, and Restaurant. All rights reserved.
      </p>
      <ul className="footer-links">
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Press</li>
        <li>Terms & Conditions</li>
      </ul>
      <p className="footer-developer">
        Developed By Mbita David, @DigitalflwSolutions
      </p>
      <div className="footer-social-icons">
        <div className="social-username">
          <FaFacebook size={24} /> <span>username_facebook</span> dine and bloom
        </div>
        <div className="social-username">
          <FaInstagram size={24} /> <span>username_instagram</span> dine and
          bloom
        </div>
        <div className="social-username">
          <FaTwitter size={24} /> <span>username_twitter</span> dine and bloom
        </div>
      </div>
      <div className="footer-phone">
        <FaPhone size={24} />
        <a href={`tel:${phoneNumber}`} className="phone-number">
          {phoneNumber}
        </a>
      </div>
    </div>
  );
};

export default Footer;
