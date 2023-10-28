import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_ERROR, PATH_HOME } from './paths';

// Guard
import AuthGuard from '../guards/auth.guard';
import GuestGuard from '../guards/guest.guard';

// Imports
import {
  // Layout
  AuthLayout,
  MainLayout,
  CollectionLayout,

  // Home
  HomePage,

  // Auth
  LoginPage,
  RegistrationPage,

  // User
  UserSettingsPage,
  UserSessionPage,

  // Admin
  UserViewPage,
  UserEditPage,
  UserListPage,

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
  ErrorPage,
} from './imports';
import { Claims } from '../config/claims';

export default function Router() {
  return useRoutes([
    // Auth routes
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
        { path: 'settings', element: <UserSettingsPage /> },
        { path: 'session', element: <UserSessionPage /> },
      ],
    },

    // Admin
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <MainLayout claims={[Claims.VIEW_ROLE_BY_ID, Claims.EDIT_ROLE_TO_USER, Claims.VIEW_ROLE_TO_USER_ALL]} />
        </AuthGuard>
      ),
      children: [
        { path: 'view/:id', element: <UserViewPage claims={[Claims.VIEW_ROLE_BY_ID]} /> },
        { path: 'edit/:id', element: <UserEditPage claims={[Claims.EDIT_ROLE_TO_USER]} /> },
        { path: 'user-list', element: <UserListPage claims={[Claims.VIEW_ROLE_TO_USER_ALL]} /> },
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
          <MainLayout claims={[Claims.VIEW_ROLE_ALL, Claims.VIEW_ROLE_BY_ID, Claims.EDIT_ROLE, Claims.CREATE_ROLE]} />
        </AuthGuard>
      ),
      children: [
        { path: 'list', element: <RoleListPage claims={[Claims.VIEW_ROLE_ALL]} /> },
        { path: 'view/:id', element: <RoleViewPage claims={[Claims.VIEW_ROLE_BY_ID]} /> },
        { path: 'edit/:id', element: <RoleEditPage claims={[Claims.EDIT_ROLE]} /> },
        { path: 'create', element: <RoleEditPage claims={[Claims.CREATE_ROLE]} /> },
        // { path: 'list', element: <RoleListPage claims={['test']} /> },
      ],
    },

    // Error routes
    {
      path: 'error/:code',
      children: [
        { path: '', element: <ErrorPage /> },
      ],
    },

    // Other routes
    { path: '/', element: <Navigate to={PATH_HOME.HOME} replace /> },
    { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
  ]);
}
