import { lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { withGuard } from './auth/auth-guard';
import { AuthProvider } from './auth/auth-context';
import { ErrorElement } from './components/error/error-element';

const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const AppContainer = lazy(() => import('./components/app-container'));
const NotesGallery = lazy(() => import('./notes/pages/notes-gallery'));
const IssueTracker = lazy(() => import('./issues/pages/issue-tracker'));
const NotFound = lazy(() => import('./pages/not-found'));
const PlanetDetails = lazy(() => import('./components/planet-details'));

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorElement />,
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: withGuard(<AppContainer />),
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'planet/:id',
            element: <PlanetDetails />,
          },
          {
            path: 'notes',
            element: <NotesGallery />,
          },
          {
            path: 'issues',
            element: <IssueTracker />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: 'public',
    element: <AppContainer />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
