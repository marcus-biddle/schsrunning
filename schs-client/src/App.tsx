import { MobileNavbar, Navbar } from './components/Navbar'
import './App.css';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
import AuthProvider from './context/authProvider';
import { checkIfMobile } from './helpers';

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
  
  return (
    <div>
      {checkIfMobile(screenWidth) ? <MobileNavbar /> : <Navbar /> }
      <div>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
      <Footer />
    </div>
  )
}
