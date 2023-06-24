import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Home } from './pages/Home/index.tsx'
import { CrossCountry } from './pages/XC/index.tsx'
import { Track } from './pages/Track/index.tsx'
import { XCSeason } from './pages/XC/Seasons/index.tsx';
import { Runners } from './pages/XC/Runners/index.tsx';
import { SeasonInfo, loader as seasonLoader, } from './pages/XC/Season/index.tsx';
import { Coaches, loader as coachesLoader } from './pages/XC/Coaches/index.tsx';
import { Runner, loader as runnerLoader, } from './pages/XC/Runner/index.tsx';
import { Top25Runners, loader as bestTimesLoader, } from './pages/XC/Top25Runners/index.tsx';
import {RaceResult, loader as raceResultLoader}  from './pages/XC/RaceResults/index.tsx';
import { Top25 } from './pages/XC/Top25/index.tsx';
import { ResultListPage } from './pages/Track/ResultListPage/index.tsx';
import { AthleteListPage } from './pages/Track/AthleteListPage/index.tsx';
import { AthletePage } from './pages/Track/AthletePage/index.tsx';
import { EventListPage} from './pages/Track/EventListPage/index.tsx';
import { EventPage } from './pages/Track/EventPage/index.tsx';
import { CoachListPage } from './pages/Track/CoachListPage/index.tsx';
import { TrackCoachPage } from './pages/Track/CoachPage/index.tsx';
import { XCCoachPage } from './pages/XC/Coach/index.tsx';
import { SeasonPage } from './pages/Track/SeasonPage/index.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader(queryClient),
    // action: rootAction(queryClient),
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Cross Country Pages
      {
        path: 'santa-clara-high-cross-country/',
        element: <CrossCountry />,
        // loader: contactLoader(queryClient),
        // action: contactAction(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners',
        element: <Runners  gender={{ gender: 'all'}} />,
        loader: runnerLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/men/:athleteId',
        element: <Runner />,
        loader: runnerLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/women/:athleteId',
        element: <Runner />,
        loader: runnerLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/men',
        element: <Runners gender={{ gender: 'men'}}/>,
        // loader: runnersLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/women',
        element: <Runners gender={{ gender: 'women'}}/>,
        // loader: runnersLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/coaches',
        element: <Coaches />,
        loader: coachesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/coaches/:coachId',
        element: <XCCoachPage />,
      },
      {
        path: 'santa-clara-high-cross-country/seasons',
        element: <XCSeason />,
        // loader: coachLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/seasons/:yearId',
        element: <SeasonInfo />,
        loader: seasonLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/race-results/men/:raceId',
        element: <RaceResult gender={{ gender: 'men'}}/>,
        loader: raceResultLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/race-results/women/:raceId',
        element: <RaceResult gender={{ gender: 'women'}}/>,
        loader: raceResultLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/race-results/:raceId',
        element: <RaceResult gender={{ gender: 'all'}}/>,
        loader: raceResultLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-25-results',
        element: <Top25/>,
        // loader: raceResultLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-25-results/all-time/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-25-results/senior/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-25-results/junior/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-25-results/sophomore/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-25-results/freshmen/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-team',
        element: <Top25/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-team/all-time/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-team/senior/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-team/junior/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-team/sophomore/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/top-team/freshmen/:courseId',
        element: <Top25Runners/>,
        loader: bestTimesLoader(queryClient),
      },
      // Track pages
      {
        path: 'santa-clara-high-track-and-field',
        element: <Track/>,
      },
      {
        path: 'santa-clara-high-track-and-field/event',
        element: <ResultListPage/>,
      },
      {
        path: 'santa-clara-high-track-and-field/athletes',
        element: <AthleteListPage gender={{ gender: 'all'}} />,
      },
      {
        path: 'santa-clara-high-track-and-field/athletes/men',
        element: <AthleteListPage gender={{ gender: 'men'}} />,
      },
      {
        path: 'santa-clara-high-track-and-field/athletes/women',
        element: <AthleteListPage gender={{ gender: 'women'}} />,
      },
      {
        path: 'santa-clara-high-track-and-field/athletes/men/:athleteId',
        element: <AthletePage />,
      },
      {
        path: 'santa-clara-high-track-and-field/athletes/women/:athleteId',
        element: <AthletePage />,
      },
      {
        path: 'santa-clara-high-track-and-field/events',
        element: <EventListPage />,
      },
      {
        path: 'santa-clara-high-track-and-field/events/track-events/:eventId',
        element: <EventPage />,
      },
      {
        path: 'santa-clara-high-track-and-field/events/field-events/:eventId',
        element: <EventPage />,
      },
      {
        path: 'santa-clara-high-track-and-field/coaches',
        element: <CoachListPage />,
      },
      {
        path: 'santa-clara-high-track-and-field/coaches/:coachId',
        element: <TrackCoachPage />,
      },
      {
        path: 'santa-clara-high-track-and-field/seasons/:yearId',
        element: <SeasonPage />,
      },
      {
        path: 'santa-clara-high-track-and-field/events/track-events/:eventId/:yearId',
        element: <EventPage />,
      },
    ],
  },
])

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path='/' index={true} element={<Home />} />
//       {/* Cross Country Paths */}
//       <Route path="santa-clara-high-cross-country/" element={<CrossCountry />} />
//         {/* Runners */}
//         <Route path='santa-clara-high-cross-country/runners/' element={<Runners />} />
//         <Route path='santa-clara-high-cross-country/runners/men' element={<Runners />} />
//         <Route path='santa-clara-high-cross-country/runners/men/:athleteId' element={<Runner />} />
//         <Route path='santa-clara-high-cross-country/runners/women' element={<Runners />} />
//         <Route path='santa-clara-high-cross-country/runners/women/:athleteId' element={<Runner />} />
//         {/* Seasons */}
//         <Route path='santa-clara-high-cross-country/seasons/' element={<XCSeason />} />
//         <Route path='santa-clara-high-cross-country/seasons/:yearId' element={<SeasonInfo />} />
//         {/* Coaches */}
//         <Route path='santa-clara-high-cross-country/coaches/' element={<Coaches />} />
//         <Route path='santa-clara-high-cross-country/coaches/:coachId' element={<CoachPage />} />

//         {/* Top Individual Result */}
//         <Route path='santa-clara-high-cross-country/top-25-results' element={<Top25 />} />

//         <Route path='santa-clara-high-cross-country/top-25-results/men/all-time/:courseId' element={<Top25Runners />} />
//         <Route path='santa-clara-high-cross-country/top-25-results/women/all-time/:courseId' element={<Top25Runners />} />

//         <Route path='santa-clara-high-cross-country/top-25-results/men/senior/:courseId' element={<Top25Runners />} />
//         <Route path='santa-clara-high-cross-country/top-25-results/women/senior/:courseId' element={<Top25Runners />} />

//         <Route path='santa-clara-high-cross-country/top-25-results/men/junior/:courseId' element={<Top25Runners />} />
//         <Route path='santa-clara-high-cross-country/top-25-results/women/junior/:courseId' element={<Top25Runners />} />

//         <Route path='santa-clara-high-cross-country/top-25-results/men/sophomore/:courseId' element={<Top25Runners />} />
//         <Route path='santa-clara-high-cross-country/top-25-results/women/sophomore/:courseId' element={<Top25Runners />} />

//         <Route path='santa-clara-high-cross-country/top-25-results/men/freshmen/:courseId' element={<Top25Runners />} />
//         <Route path='santa-clara-high-cross-country/top-25-results/women/freshmen/:courseId' element={<Top25Runners />} />

//         {/* Top Team */}
//         <Route path='santa-clara-high-cross-country/top-team' element={<Top25 />} />
//         <Route path='santa-clara-high-cross-country/top-team/men/:courseId' element={<Top15 />} />
//         <Route path='santa-clara-high-cross-country/top-team/women/:courseId' element={<Top15 />} />

//       {/* Track Paths */}
//       <Route path="santa-clara-high-track-and-field/" element={<Track />} />
//       {/* Workout Paths */}
//     </Route>
//   )
// );


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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools position="bottom-right" /> */}
    </QueryClientProvider>
  </React.StrictMode>,
)
