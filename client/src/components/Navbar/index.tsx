import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './styled/index.css';
// import logo from '../../assets/index';
import { BiMenu } from 'react-icons/bi';
import { fetchAthletes } from '../../api/athletes';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineSearch } from 'react-icons/ai'
import {BsArrowReturnLeft } from 'react-icons/bs';
import useActiveLink from '../../helpers/hooks/useActiveLink';
import { useAuth } from '../../helpers/hooks/useAuth';
import useLogout from '../../helpers/hooks/useLogout';
import { useNavbar } from '../../context/NavbarContext';
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
  }
]

export const Navbar = () => {
  //
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive, toggleActive } = useActiveLink(location.pathname);
  const { data: athletes } = useQuery(athleteListQuery());
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(event.target.value !== '');
    console.log(showDropdown)
  };

  const handleAuth = async (link: string) => {
    if (auth.accessToken) {
      await logout();
    }
    toggleActive(link);
  }

  const handleSearchButton = () => {
    setOpenModal(true);
  }

  const filteredData = athletes && athletes.filter((athlete) => {
    const fullName = `${athlete.firstName} ${athlete.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleViewProfile = (athleteId: number) => {
    navigate(`/santa-clara-high-cross-country/runners/${athleteId}`);
    setOpenModal(false);
    setSearchTerm('');
  };

  return (
    <nav className="navbar">
      <div className='logo'>
        SCHS
      </div>
      <div className='search-container'>
        <button onClick={() => handleSearchButton()}>Search Athletes</button>
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
          <Link
          to={auth.accessToken != "" ? '/' : '/login'}
          className={isActive('/login') ? 'active' : ''}
          onClick={() => handleAuth(auth.accessToken != "" ? '/' : '/login')}
          >{
            auth.accessToken != "" ? 'Logout' : 'Login'}
          </Link>
      </div>
      {openModal && (
        <div className="nav-modal">
          <div className='search-form'>
            <div>
            <button onClick={() => setOpenModal(false)}>Close</button>
            <input
              type="text"
              placeholder="Search Athletes"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            </div>
            <ul>
            {searchTerm != '' && filteredData?.map((athlete) => (
                <li key={athlete.athleteId} onClick={() => handleViewProfile(athlete.athleteId)}>
                  <span>{athlete.firstName} {athlete.lastName}</span>
                  <span>
                    <BsArrowReturnLeft className='nav-modal-icon' />
                  </span>
                </li>
            ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { isActive, toggleActive, activeLink } = useActiveLink(location.pathname);
  const { isNavbarOpen, toggleNavbar } = useNavbar();
  const { auth } = useAuth();
  const logout = useLogout();

  const handleAuth = async (link: string) => {
    if (auth.accessToken) {
      await logout();
    }
    
    toggleActive(link);
    toggleNavbar();
  }

  const handleNavClick = (link: string) => {
    toggleActive(link);
    toggleNavbar();
  }

  useEffect(() => {
    const isInsideArray = LEFT_NAV_LINKS.some((obj) => obj.link === location.pathname);
    if (activeLink !== location.pathname && isInsideArray) {
      toggleActive(location.pathname)
    }
  }, [activeLink, location.pathname, toggleActive])

  return (
    <nav>
      <div className='nav-icon-container'>
          <BiMenu className='navbar-icon' onClick={toggleNavbar}/>
          <AiOutlineSearch className='navbar-icon' />
      </div>
      {isNavbarOpen && <div className='nav-open'>
        <div className='mobile-link-container'>
          {LEFT_NAV_LINKS.map((link) => {
                return (
                    <Link 
                      to={link.link} 
                      key={link.text}
                      className={isActive(`${link.link}`) ? 'active' : ''}
                      onClick={() => handleNavClick(`${link.link}`)}
                      >
                      {link.text}
                    </Link>
                )
            })}
            <Link
            to={auth.accessToken != "" ? '/' : '/login'}
            className={isActive('/login') ? 'active' : ''}
            onClick={() => handleAuth(auth.accessToken != "" ? '/' : '/login')}
            >{
              auth.accessToken != "" ? 'Logout' : 'Login'}
            </Link>
        </div>
      </div>}
    </nav>
  );
}