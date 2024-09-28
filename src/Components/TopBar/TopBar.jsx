import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons
import './TopBar.css';

const TopBar = () => {
  const [showTopBar, setShowTopBar] = useState(true);

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

  return (
    <div className={`topBar ${showTopBar ? 'visible' : 'hidden'}`}>
      <li className="add-item">
        <Link to="/add">
          <FaPlus size={24} color="white" />
        </Link>
      </li>
      <li>
        <Link to="/fastfoods">Fast Foods</Link>
      </li>
      <li>
        <Link to="/desserts">Desserts</Link>
      </li>
      <li>
        <Link to="/drinks">Drinks</Link>
      </li>
      <li>
        <Link to="/flowers">Meals & Flowers</Link>
      </li>
    </div>
  );
};

export default TopBar;
