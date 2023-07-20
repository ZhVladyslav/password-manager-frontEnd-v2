import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// consts
import { PATH_ERROR, PATH_MAIN } from './paths';

// components
import {
  AuthLayout,
  CollectionViewPage,
  Error400Page,
  Error401Page,
  Error403Page,
  Error404Page,
  Error500Page,
  HomePage,
  LoginPage,
  CollectionListPage,
  RegistrationPage,
  CollectionCreatePage,
} from './imports';
import { GuestGuard } from '../modules/guards/GuestGuard';
import { AuthGuard } from '../modules/guards/AuthGuard';
// import { AuthGuard } from '../modules/guards/AuthGuard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    //
    // Main
    //

    {
      path: '/home',
      element: (
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      ),
    },

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
      path: 'collection',
      element: (
        <AuthGuard>
          <AuthLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'list', element: <CollectionListPage /> },
        { path: 'view/:id', element: <CollectionViewPage /> },
        { path: 'create', element: <CollectionCreatePage /> },
      ],
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

    { path: '/', element: <Navigate to={PATH_MAIN.home} replace /> },
    { path: '*', element: <Navigate to={PATH_ERROR.error404} replace /> },
  ]);
}
