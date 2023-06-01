import { Navbar } from './components/Navbar'
import './App.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
