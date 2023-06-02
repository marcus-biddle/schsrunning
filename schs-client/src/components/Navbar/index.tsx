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
        <Link to="santa-clara-high-cross-country/" className="navbar__link">
          XC
        </Link>
        <Link to="santa-clara-high-track-and-field/" className="navbar__link">
          Track
        </Link>
        <Link to="/workouts" className="navbar__link">
          Workouts
        </Link>
      </div>
    </nav>
  );
};
