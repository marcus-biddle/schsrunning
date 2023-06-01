import React from 'react';
import { Link } from 'react-router-dom';
import './styled/index.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/xc" className="navbar__link">
          XC
        </Link>
        <Link to="/track" className="navbar__link">
          Track
        </Link>
        <Link to="/workouts" className="navbar__link">
          Workouts
        </Link>
      </div>
    </nav>
  );
};
