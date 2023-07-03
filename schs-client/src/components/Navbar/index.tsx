import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styled/index.css';
import { urlContains } from '../../helpers';
import { deleteAccessTokenCookie } from '../../authUtils';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdminPage = urlContains(location.pathname, ['admin'])
  const handleLogout = () => {
    deleteAccessTokenCookie();
  };

  return (
    <nav className="navbar">
      {isAdminPage ? 
      <div className="nav-container">
      <Link to="/admin/dashboard" className="navbar__link">
        Athletes
      </Link>
      {/* <Link to="/admin/athletes" className="navbar__link">
        Athletes
      </Link> */}
      <Link to="/admin/xc-races" className="navbar__link">
        XC Races
      </Link>
      <Link to="/admin/track-events" className="navbar__link">
        Track Events
      </Link>
      <Link to="/" onClick={handleLogout} className="navbar__link">
        Logout
      </Link>
    </div>
      :
      <div className="nav-container">
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
      </div>}
    </nav>
  );
};
