import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css';
import { ErrorPage } from './pages/ErrorPage.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home } from './pages/Home/index.tsx'
import { CrossCountry } from './pages/XC/index.tsx'
import { Track } from './pages/Track/index.tsx'
import { Workouts } from './pages/Workouts/index.tsx'
import { XCSeason } from './pages/XC/Season/index.tsx';
import { Runners } from './pages/XC/Runners/index.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/' index={true} element={<Home />} />
      {/* Cross Country Paths */}
      <Route path="santa-clara-high-cross-country/" element={<CrossCountry />} />
      <Route path='santa-clara-high-cross-country/runners/' element={<Runners />} />
      {/* Track Paths */}
      <Route path="santa-clara-high-track-and-field/" element={<Track />} />
      {/* Workout Paths */}
    </Route>
  )
);


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home />},
//       {
//         path: 'santa-clara-high-cross-country/',
//         element: <CrossCountry />,
//         children: [
//           {
//             path: 'seasons/',
//             element: <XCSeason />
//           },
//           {
//             path: 'runners/',
//             element: <Runners />
//           },
//           {
//             path: 'coaches/',
//             element: <XCSeason />
//           },
//           {
//             path: 'alumni/',
//             element: <XCSeason />
//           }
//         ]
//       },
//       {
//         path: "santa-clara-high-track-and-field/",
//         element: <Track />
//       },
//       {
//         path: "workouts/",
//         element: <Workouts />
//       }
//     ]
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
