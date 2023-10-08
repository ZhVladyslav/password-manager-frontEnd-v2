import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_ERROR, PATH_HOME } from './paths';

// Guard
import AuthGuard from '../guards/auth.guard';
import GuestGuard from '../guards/guest.guard';

// Imports
import {
  // Layout
  MainLayout,
  CollectionLayout,

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
  DataCreatePage,
  DataDecryptPage,
  DataViewPage,
  DataEditPage,

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

    // PassCollection
    {
      path: 'passCollection',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to={PATH_PASS_COLLECTION.LIST} replace /> },
        { path: 'list', element: <DataListPage /> },
        { path: 'create', element: <DataCreatePage /> },
      ],
    },

    // PassCollectionDecrypt
    {
      path: 'passCollection-decrypt',
      element: (
        <AuthGuard>
          <CollectionLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to={PATH_PASS_COLLECTION.LIST} replace /> },
        { path: 'decrypt/:id', element: <DataDecryptPage /> },
        { path: 'view/:id', element: <DataViewPage /> },
        { path: 'edit/:id', element: <DataEditPage /> },
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
        { path: 'list', element: <RoleListPage /> },
        { path: 'view/:id', element: <RoleViewPage /> },
        { path: 'edit/:id', element: <RoleEditPage /> },
        { path: 'create', element: <RoleEditPage /> },
        // { path: 'list', element: <RoleListPage claims={['test']} /> },
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
