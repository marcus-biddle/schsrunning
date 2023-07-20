import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styled/index.css';
import { urlContains } from '../../helpers';
import { deleteAccessTokenCookie } from '../../authUtils';
import logo from '../../assets/logo.png';
import { SearchInput } from '../SearchFeatures/SearchInput';
import { GenericButton } from '../Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  // const isAdminPage = urlContains(location.pathname, ['admin'])
  // const handleLogout = () => {
  //   deleteAccessTokenCookie();
  // };

  return (
    <nav className="navbar">
      {/* {isAdminPage ? 
      <div className="nav-container">
      <Link to="/admin/dashboard" className="navbar__link">
        Athletes
      </Link>
      <Link to="/admin/athletes" className="navbar__link">
        Athletes
      </Link>
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
      : */}
        {/* left side of navbar */}
        {/* <div className="nav-container-left" >
          <div style={{ position: 'relative', height: '32px', width: '56px', overflow: 'hidden', display: 'flex', justifyContent: 'start'}}>
            <img src={logo} alt='schs logo' style={{ height: '4.5rem', width: '4rem', position: 'absolute', top: '-18px', right: '-4px'}}/>
          </div>
          <div>
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
        </div> */}
        {/* Right side of navbar */}
        {/* <div style={{ display: 'flex', backgroundColor: 'gray'}}>
          
          <input
              type="text"
              placeholder="Search Athletes"
              value={''}
              onChange={() => null}
              className="search-input"
          />
          <button>Search</button>

        </div> */}
      
      {/* } */}
    </nav>
  );
};
