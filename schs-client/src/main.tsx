import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css';
import { ErrorPage } from './pages/ErrorPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/index.tsx'
import { CrossCountry } from './pages/XC/index.tsx'
import { Track } from './pages/Track/index.tsx'
import { Workouts } from './pages/Workouts/index.tsx'
import { XCSeason } from './pages/XC/Season/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />},
      {
        path: 'santa-clara-high-cross-country/',
        element: <CrossCountry />,
        children: [
          {
            path: 'season/',
            element: <XCSeason />
          }
        ]
      },
      {
        path: "santa-clara-high-track-and-field/",
        element: <Track />
      },
      {
        path: "workouts/",
        element: <Workouts />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
