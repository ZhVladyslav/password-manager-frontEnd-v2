import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_ERROR, PATH_HOME } from './paths';

// Guard
import AuthGuard from '../guards/auth.guard';
import GuestGuard from '../guards/guest.guard';

// Imports
import {
  // Layout
  MainLayout,

  // Home
  HomePage,

  // Auth
  LoginPage,
  RegistrationPage,

  // User
  UserViewPage,
  UserSettingsPage,

  // Data
  DataListPage,
  DataViewPage,
  DataCreatePage,

  // Role
  RoleViewPage,
  RoleListPage,
  RoleEditPage,

  // Errors
  Error403Page,
  Error404Page,
  Error500Page,
} from './imports';
import ClaimsGuard from '../guards/claim.guard';

export default function Router() {
  return useRoutes([
    // Auth routes
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

    // Home
    {
      path: '',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [{ path: '/', element: <HomePage /> }],
    },

    // User
    {
      path: 'user',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'view', element: <UserViewPage /> },
        { path: 'settings', element: <UserSettingsPage /> },
      ],
    },

    // Data
    {
      path: 'data',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'list', element: <DataListPage /> },
        { path: 'view/:id', element: <DataViewPage /> },
        { path: 'create', element: <DataCreatePage /> },
      ],
    },

    // Role
    {
      path: 'role',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'list', element: <RoleListPage claims={['test']} /> },
        { path: 'edit', element: <RoleEditPage claims={['test']} /> },
        { path: 'view', element: <RoleViewPage claims={['test']} /> },
      ],
    },

    // Error routes
    {
      path: 'error',
      children: [
        { path: '403', element: <Error403Page /> },
        { path: '404', element: <Error404Page /> },
        { path: '500', element: <Error500Page /> },
      ],
    },

    // Other routes
    { path: '/', element: <Navigate to={PATH_HOME.HOME} replace /> },
    { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
  ]);
}
