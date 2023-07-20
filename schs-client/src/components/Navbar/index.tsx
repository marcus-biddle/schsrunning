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
        {/* left side of navbar */}
        <div className="nav-container-left" >
          <div style={{ position: 'relative', height: '32px', width: '64px', overflow: 'hidden', display: 'flex', justifyContent: 'start'}}>
            <img src={logo} alt='schs logo' style={{ height: '2.5rem', width: '3.75rem', position: 'absolute', top: '-4px', right: '-4px'}}/>
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
        </div>
        {/* Right side of navbar */}
        <div style={{ display: 'flex', height: '100%', alignItems: 'center'}}>
          <div>
            <input
                type="text"
                placeholder="Search Athletes"
                value={''}
                onChange={() => null}
                style={{ height: '24px', borderRadius: '4px', border: '1px solid #ccc', width: '240px', fontFamily: 'Lato'}}
            />
            <button style={{ height: '24px', borderRadius: '4px', border: '1px solid #36CDE0', backgroundColor: '#36CDE0', fontFamily: 'Roboto', padding: '0 6px 0 6px', marginLeft: '2px'}}>Search</button>
          </div>
          <div style={{ padding: '8px'}}>
            <Link to="/login" className="navbar__link">
              Login
            </Link>
          </div>
        </div>
    </nav>
  );
};
