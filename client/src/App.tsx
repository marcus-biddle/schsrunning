import { MobileNavbar, Navbar } from './components/Navbar'
import './App.css';
import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { checkIfMobile } from './helpers';
// import BottomNavbar from './components/BottomNav';

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {

    window.scrollTo(0,0);
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [pathname])

  const navOption = () => {
    if (pathname.includes('admin')) {
      return null;
    } else {
      if (checkIfMobile(screenWidth)) {
        return <MobileNavbar />
      } else {
        return <Navbar />
      }
    }
  }
  
  return (
    <div>
      {navOption()}
      <div>
          <Outlet />
      </div>
      {/* {checkIfMobile(screenWidth) ? <BottomNavbar /> : null } */}
      {/* <Footer /> */}
    </div>
  )
}
