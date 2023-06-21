import { Navbar } from './components/Navbar'
import './App.css';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './components/Footer';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])
  
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '4rem'}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
