import { Navbar } from './components/Navbar'
import './App.css';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import AuthProvider from './context/authProvider';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])
  
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '4rem'}}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
      <Footer />
    </div>
  )
}
