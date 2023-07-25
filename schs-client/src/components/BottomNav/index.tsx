import { useState } from 'react'
import './styled.css'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'

const BottomNavbar = () => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname.includes('search') ? 'search' : location.pathname.includes('profile') ? 'profile' : 'home');
  return (
    <div className="navbar-bottom">
        <Link to={'/'} onClick={() => setActive('home')} >
            <div className={active === 'home' ? 'navbar-bottom-icon-container-active' : 'navbar-bottom-icon-container'} >
                <AiOutlineHome id='home' className="navbar-bottom-icon"/>
            </div>
            <h5>Home</h5>
        </Link>
        <Link to={'/search'} onClick={() => setActive('search')}>
            <div className={active === 'search' ? 'navbar-bottom-icon-container-active' : 'navbar-bottom-icon-container'}>
                <AiOutlineSearch id='search' className="navbar-bottom-icon"/>
            </div>
            <h5>Search</h5>
        </Link>
        <Link to={'/'} onClick={() => setActive('profile')}>
            <div className={active === 'profile' ? 'navbar-bottom-icon-container-active' : 'navbar-bottom-icon-container'}>
                <AiOutlineUser id='profile' className="navbar-bottom-icon"/>
            </div>
            <h5>Profile</h5>
        </Link>
    </div>
  )
}

export default BottomNavbar