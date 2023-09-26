import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styled/index.css';
// import logo from '../../assets/index';
import { BiMenu } from 'react-icons/bi';
import { fetchAthletes } from '../../api/athletes';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineSearch } from 'react-icons/ai'
import useActiveLink from '../../helpers/hooks/useActiveLink';
// import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';

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

const LEFT_NAV_LINKS = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'XCountry',
    link: '/santa-clara-high-cross-country/'
  },
  {
    text: 'Login',
    link: '/login'
  },
]

export const Navbar = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { isActive, toggleActive } = useActiveLink(location.pathname);
  const { data: athletes } = useQuery(athleteListQuery());
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(event.target.value !== '');
    console.log(showDropdown)
  };

  // const filteredData = athletes && athletes.filter((athlete) => {
  //   const fullName = `${athlete.firstName} ${athlete.lastName}`;
  //   return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // const handleViewProfile = (athleteId: number) => {
  //   navigate(`/athlete/${athleteId}`);
  // };

  return (
    <nav className="navbar">
      <div className='logo'>
        SCHS
      </div>
      <div className='search-container'>
        <input
            type="text"
            placeholder={athletes ? "Search Athletes" : "Loading..."}
            value={searchTerm}
            onChange={handleSearchChange}
        />
      </div>
      <div className='link-container'>
        {LEFT_NAV_LINKS.map((link) => {
              return (
                  <Link 
                    to={link.link} 
                    key={link.text}
                    className={isActive(`${link.link}`) ? 'active' : ''}
                    onClick={() => toggleActive(`${link.link}`)}
                    >
                    {link.text}
                  </Link>
              )
          })}
      </div>
      
        {/* <div className="nav-container-left" >
          <div style={{ position: 'relative', height: '32px', width: '64px', overflow: 'hidden', display: 'flex', justifyContent: 'start'}}>
        
            SCHS
          </div>
          {LEFT_NAV_LINKS.map((link) => {
            return (
                <Link to={link.link} key={link.text} className="navbar__link">
                  {link.text}
                </Link>
            )
          })}
        </div>
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
            <Link to="login/" className="navbar__link" style={{ paddingRight: '0'}}>
              Login
            </Link>
          </div>
        </div> */}
    </nav>
  );
};

export const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? 'navbar-mobile-fullscreen' : 'navbar-mobile'}>
      <div style={{ display: 'flex', paddingTop: `${isOpen ? '8.5px' : ''}`}}>
      {/* <img src={logo} alt='logo' style={{ height: '38px' }}/> */}
      <h1 style={{ color: 'white', fontSize: '20px', paddingTop: '8px', paddingLeft: '2px', fontWeight: 'lighter', fontFamily: '"Roboto", sans-serif'}}>SCHS Running</h1>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px'}}>
      <div className='navbar-icon-container-search'>
          <AiOutlineSearch className='navbar-icon' />
        </div>
        <div className='navbar-icon-container-menu'>
          <BiMenu className='navbar-icon' onClick={() => handleMenuToggle()}/>
        </div>
      </div>

      {isOpen && <div className={`menu-content ${isOpen ? 'open' : 'closed'}`}>
        {/* Your menu items go here */}
        <h4>
          <Link to={'/'} onClick={() => setIsOpen(false)}>Home</Link>
        </h4>
        <h4>
          <Link to={'/cross-country'} onClick={() => setIsOpen(false)}>Cross Country</Link>
        </h4>
        <ul>
          <li>
            <Link to={'/athletes/cross-country'}>Athletes</Link>
          </li>
          <li>
            <Link to={'/coaches/cross-country'}>Coaches</Link>
          </li>
          <li>Team Records</li>
        </ul>
        <h4>Track & Field</h4>
        <ul>
          <li>Athletes</li>
          <li>Coaches</li>
          <li>Team Records</li>
        </ul>
        <div className='lineStyle'>
          <div className='line-break'></div>
        </div>
        <h4>Search</h4>
        <h4>Gallery</h4>
        <h4>Sites</h4>
      </div>}
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