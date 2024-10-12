import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaBars, FaTimes } from 'react-icons/fa'; // Import the icons
import './TopBar.css';

const TopBar = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition / windowHeight > 0.1) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`topBar ${showTopBar ? 'visible' : 'hidden'}`}>
      <li className="add-item">
        <Link to="/add">
          <FaPlus size={24} color="white" />
        </Link>
      </li>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <FaTimes size={24} color="white" />
        ) : (
          <FaBars size={24} color="white" />
        )}
      </div>

      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/fastfoods">Meals</Link>
        </li>
        <li>
          <Link to="/desserts">Desserts</Link>
        </li>
        <li>
          <Link to="/drinks">Drinks</Link>
        </li>
        <li>
          <Link to="/flowers">Flowers</Link>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
