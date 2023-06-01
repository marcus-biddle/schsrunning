import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ErrorPage } from './pages/ErrorPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/index.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />}
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
