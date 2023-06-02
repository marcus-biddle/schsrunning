import { Navbar } from './components/Navbar'
import './App.css';
import { Outlet } from 'react-router';
import { Footer } from './components/Footer';

function App() {
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
