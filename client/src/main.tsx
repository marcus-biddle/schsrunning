import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Home } from './pages/Home/index.tsx'
import { CrossCountry } from './layouts/Xcountry/Home/index.tsx'
import { Track } from './pages/Track/index.tsx'
import { XCSeason } from './layouts/Xcountry/Seasons/index.tsx';
import { Runners } from './layouts/Xcountry/Runners/index.tsx';
import { SeasonInfo, loader as seasonLoader, } from './pages/Xcountry/Season/index.tsx';
import { Coaches, loader as coachesLoader } from './layouts/Xcountry/Coaches/index.tsx';
import { Runner, loader as runnerLoader, } from './pages/Xcountry/Runner/index.tsx';
import {RaceResult, loader as raceResultLoader}  from './pages/Xcountry/RaceResults/index.tsx';
import { ResultListPage } from './pages/Track/ResultListPage/index.tsx';
import { AthleteListPage } from './pages/Track/AthleteListPage/index.tsx';
import { AthletePage } from './pages/Track/AthletePage/index.tsx';
import { EventListPage} from './pages/Track/EventListPage/index.tsx';
import { EventPage } from './pages/Track/EventPage/index.tsx';
import { CoachListPage } from './pages/Track/CoachListPage/index.tsx';
import { TrackCoachPage } from './pages/Track/CoachPage/index.tsx';
import { XCCoachPage } from './pages/Xcountry/Coach/index.tsx';
import { SeasonPage } from './pages/Track/SeasonPage/index.tsx';
import AdminDashboard from './pages/Admin/Dashboard/index.tsx';
import EditAthlete from './pages/Admin/EditAthlete/index.tsx';
import CreateAthleteForm from './pages/Admin/CreateAthlete/index.tsx';
import AdminAthletesPage from './pages/Admin/AthletesPage/index.tsx';
import AdminRacesPage from './pages/Admin/RacesPage/index.tsx';
import RacePage from './pages/Admin/RacePage/index.tsx';
import AddCompetitors from './pages/Admin/AddCompetitors/index.tsx';
import { TopRunnerMenu } from './layouts/Xcountry/TopRunnerMenu/index.tsx';
import { TopTeamMenu } from './layouts/Xcountry/TopTeamMenu/index.tsx';
import { TopTeams } from './pages/Xcountry/TopTeams/index.tsx';
import {SearchPage} from './pages/SearchPage/index.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import { AuthProvider } from './context/authProvider.tsx';
import { PersistLoginPage } from './pages/Login/PersistLoginPage.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'athlete/:athleteId',
        element: <Runner />,
      },
      {
        path: 'search/',
        element: <SearchPage/>,
      },
      // Cross Country Pages
      {
        path: 'santa-clara-high-cross-country/',
        element: <CrossCountry />,
      },
      {
        path: 'cross-country/athlete/:athleteId',
        element: <Runner />,
      },
      {
        path: 'cross-country/runners/:athleteId',
        element: <Runner />,
      },
      {
        path: 'cross-country/',
        element: <CrossCountry />,
      },
      {
        path: 'santa-clara-high-cross-country/runners',
        element: <Runners />,
        loader: runnerLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/:athleteId',
        element: <Runner />,
        loader: runnerLoader(queryClient),
      },
      {
        // path: 'santa-clara-high-cross-country/runners/women/:athleteId',
        // element: <Runner />,
        // loader: runnerLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/men',
        element: <Runners />,
        // loader: runnersLoader(queryClient),
      },
      {
        path: 'santa-clara-high-cross-country/runners/women',
        element: <Runners />,
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
        path: 'santa-clara-high-cross-country/top-runners-menu',
        element: <TopRunnerMenu/>,
        // loader: raceResultLoader(queryClient),
      },
      // {
      //   path: 'santa-clara-high-cross-country/top-runners-menu/:courseId',
      //   element: <TopRunners/>,
      // },
      {
        path: 'santa-clara-high-cross-country/top-teams-menu',
        element: <TopTeamMenu/>,
      },
      {
        path: 'santa-clara-high-cross-country/top-teams-menu/:courseId',
        element: <TopTeams/>,
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
      {
        path: 'santa-clara-high-track-and-field/events/field-events/:eventId/:yearId',
        element: <EventPage />,
      },
      // ----------------------------------------Admin--------------------------------------------------
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin/dashboard/',
        element: (
          <AdminDashboard />
        ),
      },
      {
        path: 'admin/athletes',
        element: (
          <AdminAthletesPage />
        ),
      },
      {
        path: 'admin/athletes/:athleteId',
        element: (
          <EditAthlete />
        ),
      },
      {
        path: 'admin/athletes/create',
        element: (
          <CreateAthleteForm/>
        ),
      },
      {
        path: 'admin/xc/races',
        element: (
          <AdminRacesPage/>
        ),
      },
      {
        path: 'admin/xc/races/:raceNameId',
        element: (
          <RacePage />
        ),
      },
      {
        path: 'admin/xc/races/add-results',
        element: (
          <AddCompetitors />
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: <PersistLoginPage />,
    children: [
      {
        path: 'home',
        element: <AdminDashboard />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
