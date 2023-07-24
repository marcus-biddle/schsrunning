import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styled/index.css';
import logo from '../../assets/logo.png';
import { BiSearchAlt2 } from 'react-icons/bi';
import { fetchAthletes } from '../../api/athletes';
import { useQuery } from '@tanstack/react-query';
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';

// eslint-disable-next-line react-refresh/only-export-components
export const athleteListQuery = () => ({
  queryKey: ['all-athletes'],
  queryFn: async () => {
      const athletes = await fetchAthletes();
      if (!athletes) {
          throw new Response('', {
              status: 404,
              statusText: 'Not Found',
          })
      }
      return athletes;
  },
})

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { data: athletes } = useQuery(athleteListQuery());
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(event.target.value !== '');
  };

  const filteredData = athletes && athletes.filter((athlete) => {
    const fullName = `${athlete.firstName} ${athlete.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleViewProfile = (athleteId: number) => {
    // create an athlete page that holds both track and cross country
    // use a pill to show either one
    // this will simplify the pages and reduce overhead
    navigate(`/athlete/${athleteId}`);
  };

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
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', width: '400px', justifyContent: 'space-between'}}>
          <div style={{ height: '25px'}}>
            <input
                type="text"
                placeholder={athletes ? "Search Athletes" : "Loading..."}
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ height: '100%', borderRadius: '4px', border: '1px solid #ccc', width: '240px', fontFamily: 'Lato, sans-serif', fontSize: '16px', paddingLeft: '8px'}}
            />
            <button style={{ height: '100%', borderRadius: '4px', border: '1px solid #36CDE0', backgroundColor: '#36CDE0', fontFamily: 'Roboto', padding: '2px 6px 0 6px', marginLeft: '2px'}}>
              <BiSearchAlt2 />
            </button>
            {filteredData && showDropdown && filteredData.length > 0 && (
              <div className="dropdown">
                <ul>
                  {filteredData.map((athlete) => (
                    <li key={athlete.athleteId} onClick={() => handleViewProfile(athlete.athleteId)}>
                      {athlete.firstName} {athlete.lastName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <Link to="/login" className="navbar__link" style={{ paddingRight: '0'}}>
              Login
            </Link>
          </div>
        </div>
    </nav>
  );
};

export const MobileNavbar: React.FC = () => {

  return (
    <div className="navbar-mobile">
      <h3>Good Morning</h3>
      <div style={{ display: 'flex', width: '88px', justifyContent: 'space-around'}}>
        <div className='navbar-icon-container'>
          <IoNotificationsOutline className='navbar-icon' />
        </div>
        <div className='navbar-icon-container'>
          <IoSettingsOutline className='navbar-icon' />
        </div>
      </div>
      {/* <div className="hamburger-mobile" onClick={toggleMenu}>
        <div className="bar-mobile"></div>
        <div className="bar-mobile"></div>
        <div className="bar-mobile"></div>
      </div>
      <div style={{ position: 'relative', height: '32px', width: '64px', overflow: 'hidden', display: 'flex', justifyContent: 'start'}}>
            <img src={logo} alt='schs logo' style={{ height: '2.5rem', width: '3.75rem', position: 'absolute', top: '-4px', right: '-4px'}}/>
        </div>
      <ul className={`menu-mobile ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">Cross Country</a></li>
        <li><a href="#services">Track</a></li>
        <li><a href="#contact">Admin</a></li>
      </ul> */}
    </div>
  );
}