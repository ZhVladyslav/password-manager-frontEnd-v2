import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { routesError, routesHome } from './paths';

// Guard
import AuthGuard from '../guards/auth.guard';
import GuestGuard from '../guards/guest.guard';

// Imports
import { LoginPage, RegistrationPage, MainLayout } from './imports';

export default function Router() {
  return useRoutes([
    //
    {
      path: 'auth',
      element: (
        <GuestGuard>
          <MainLayout />
        </GuestGuard>
      ),
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'registration', element: <RegistrationPage /> },
      ],
    },

    //
    {
      path: '',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [{ path: '/', element: <></> }],
    },

    //
    {
      path: 'error',
      children: [{ path: '404', element: <></> }],
    },

    //
    { path: '/', element: <Navigate to={routesHome.home} replace /> },
    { path: '*', element: <Navigate to={routesError[404]} replace /> },
  ]);
}
