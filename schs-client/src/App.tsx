import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Navbar} from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>Test</div>
      <Navbar />
    </>
  )
}

export default App
