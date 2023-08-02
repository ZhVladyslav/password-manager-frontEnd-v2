import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// const
import { PATH_COLLECTION, PATH_ERROR } from './paths';

// components
import {
  AuthLayout,
  Error400Page,
  Error401Page,
  Error403Page,
  Error404Page,
  Error500Page,
  LoginPage,
  RegistrationPage,
  Dashboard,
} from './imports';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from '../layouts/DashboardLayout';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    //
    // Auth
    //

    {
      path: 'auth',
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'registration', element: <RegistrationPage /> },
      ],
    },

    //
    // Collection
    //

    {
      path: '',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ path: '/', element: <Dashboard /> }],
    },

    //
    // Errors
    //

    {
      path: 'error',
      children: [
        { path: '400', element: <Error400Page /> },
        { path: '401', element: <Error401Page /> },
        { path: '403', element: <Error403Page /> },
        { path: '404', element: <Error404Page /> },
        { path: '500', element: <Error500Page /> },
      ],
    },

    //
    // Other
    //

    { path: '/', element: <Navigate to={PATH_COLLECTION.view} replace /> },
    { path: '*', element: <Navigate to={PATH_ERROR.error404} replace /> },
  ]);
}
