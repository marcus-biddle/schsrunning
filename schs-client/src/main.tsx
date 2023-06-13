import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home } from './pages/Home/index.tsx'
import { CrossCountry } from './pages/XC/index.tsx'
import { Track } from './pages/Track/index.tsx'
import { XCSeason } from './pages/XC/Season/index.tsx';
import { Runners } from './pages/XC/Runners/index.tsx';
import { SeasonInfo } from './pages/XC/SeasonInfo/index.tsx';
import { Coaches } from './pages/XC/Coaches/index.tsx';
import { Top25 } from './pages/XC/Top25/index.tsx';
import { CoachPage } from './pages/XC/Coach/index.tsx';
import { Runner } from './pages/XC/Runner/index.tsx';
import { Top25Runners } from './pages/XC/Top25Runners/index.tsx';
import { Top15 } from './pages/XC/Top15Teams/index.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/' index={true} element={<Home />} />
      {/* Cross Country Paths */}
      <Route path="santa-clara-high-cross-country/" element={<CrossCountry />} />
        {/* Runners */}
        <Route path='santa-clara-high-cross-country/runners/' element={<Runners />} />
        <Route path='santa-clara-high-cross-country/runners/men' element={<Runners />} />
        <Route path='santa-clara-high-cross-country/runners/men/:athleteId' element={<Runner />} />
        <Route path='santa-clara-high-cross-country/runners/women' element={<Runners />} />
        <Route path='santa-clara-high-cross-country/runners/women/:athleteId' element={<Runner />} />
        {/* Seasons */}
        <Route path='santa-clara-high-cross-country/seasons/' element={<XCSeason />} />
        <Route path='santa-clara-high-cross-country/seasons/:year' element={<SeasonInfo />} />
        {/* Coaches */}
        <Route path='santa-clara-high-cross-country/coaches/' element={<Coaches />} />
        <Route path='santa-clara-high-cross-country/coaches/:coachId' element={<CoachPage />} />

        {/* Top Individual Result */}
        <Route path='santa-clara-high-cross-country/top-25-results' element={<Top25 />} />

        <Route path='santa-clara-high-cross-country/top-25-results/men/all-time/:courseId' element={<Top25Runners />} />
        <Route path='santa-clara-high-cross-country/top-25-results/women/all-time/:courseId' element={<Top25Runners />} />

        <Route path='santa-clara-high-cross-country/top-25-results/men/senior/:courseId' element={<Top25Runners />} />
        <Route path='santa-clara-high-cross-country/top-25-results/women/senior/:courseId' element={<Top25Runners />} />

        <Route path='santa-clara-high-cross-country/top-25-results/men/junior/:courseId' element={<Top25Runners />} />
        <Route path='santa-clara-high-cross-country/top-25-results/women/junior/:courseId' element={<Top25Runners />} />

        <Route path='santa-clara-high-cross-country/top-25-results/men/sophomore/:courseId' element={<Top25Runners />} />
        <Route path='santa-clara-high-cross-country/top-25-results/women/sophomore/:courseId' element={<Top25Runners />} />

        <Route path='santa-clara-high-cross-country/top-25-results/men/freshmen/:courseId' element={<Top25Runners />} />
        <Route path='santa-clara-high-cross-country/top-25-results/women/freshmen/:courseId' element={<Top25Runners />} />

        {/* Top Team */}
        <Route path='santa-clara-high-cross-country/top-team' element={<Top25 />} />
        <Route path='santa-clara-high-cross-country/top-team/men/:courseId' element={<Top15 />} />
        <Route path='santa-clara-high-cross-country/top-team/women/:courseId' element={<Top15 />} />

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
