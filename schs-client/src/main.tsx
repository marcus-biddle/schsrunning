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
import { Runner } from './pages/XC/Runner/index.tsx';
import { SeasonInfo } from './pages/XC/SeasonInfo/index.tsx';
import { Coaches } from './pages/XC/Coaches/index.tsx';
import { Coach } from './pages/XC/Coach/index.tsx';
import { Top25 } from './pages/XC/Top25/index.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/' index={true} element={<Home />} />
      {/* Cross Country Paths */}
      <Route path="santa-clara-high-cross-country/" element={<CrossCountry />} />
        {/* Runners */}
        <Route path='santa-clara-high-cross-country/runners/' element={<Runners />} />
        <Route path='santa-clara-high-cross-country/runners/men' element={<Runners />} />
        <Route path='santa-clara-high-cross-country/runners/men/:runnerId' element={<Runner />} />
        <Route path='santa-clara-high-cross-country/runners/women' element={<Runners />} />
        <Route path='santa-clara-high-cross-country/runners/women/:runnerId' element={<Runner />} />
        {/* Seasons */}
        <Route path='santa-clara-high-cross-country/seasons/' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/seasons/:year' element={<SeasonInfo />} />
        {/* Coaches */}
        <Route path='santa-clara-high-cross-country/coaches/' element={<Coaches />} />
        <Route path='santa-clara-high-cross-country/coaches/:coachId' element={<Coach />} />

        {/* Top Individual Result */}
        <Route path='santa-clara-high-cross-country/top-25-results' element={<Top25 />} />
        <Route path='santa-clara-high-cross-country/top-25-results/all-men' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/all-women' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/all-men/:raceId' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/all-women/:raceId' element={<XCSeason />} />

        <Route path='santa-clara-high-cross-country/top-25-results/senior-men' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/senior-women' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/senior-men/:raceId' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/senior-women/:raceId' element={<XCSeason />} />

        <Route path='santa-clara-high-cross-country/top-25-results/junior-men' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/junior-women' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/junior-men/:raceId' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/junior-women/:raceId' element={<XCSeason />} />

        <Route path='santa-clara-high-cross-country/top-25-results/soph-men' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/soph-women' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/soph-men/:raceId' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/soph-women/:raceId' element={<XCSeason />} />

        <Route path='santa-clara-high-cross-country/top-25-results/fresh-men' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/fresh-women' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/fresh-men/:raceId' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-25-results/fresh-women/:raceId' element={<XCSeason />} />

        {/* Top Team */}
        <Route path='santa-clara-high-cross-country/top-team' element={<Top25 />} />
        <Route path='santa-clara-high-cross-country/top-team/men/:raceId' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/top-team/women/:raceId' element={<XCSeason />} />

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
