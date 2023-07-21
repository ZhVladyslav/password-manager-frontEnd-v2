import React, { Suspense, lazy, ComponentType } from 'react';
import Loading from '../pages/loading/LoadingPage';
import { AccessGuard } from '../modules/guards/AccessGuard';
import { RoleGuard } from '../modules/guards/RoleGuard';

// ----------------------------------------------------------------------

interface iLoadable {
  claims?: string[] | undefined;
  roles?: string[] | undefined;
  // eslint-disable-next-line
  [key: string]: any;
}

// ----------------------------------------------------------------------

/* eslint-disable react/display-name */
export const Loadable =
  (Component: ComponentType) =>
  ({ claims, roles, ...props }: iLoadable) => {
    if (claims && roles) return <></>;

    if (claims && !roles)
      return (
        <Suspense fallback={<Loading />}>
          <AccessGuard claims={claims}>
            <Component {...props} />
          </AccessGuard>
        </Suspense>
      );

    if (roles && !claims)
      return (
        <Suspense fallback={<Loading />}>
          <RoleGuard roles={roles}>
            <Component {...props} />
          </RoleGuard>
        </Suspense>
      );

    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };

// ----------------------------------------------------------------------

//
// IMPORTS
//

// ----------------------------------------------------------------------

// Layouts
export const AuthLayout = Loadable(lazy(() => import('../layouts/AuthLayout')));

// Main
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const Main = Loadable(lazy(() => import('../pages/collections')));

// Auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegistrationPage = Loadable(lazy(() => import('../pages/auth/RegistrationPage')));

// Auth
export const CollectionListPage = Loadable(lazy(() => import('../pages/collections/ListPage')));
export const CollectionViewPage = Loadable(lazy(() => import('../pages/collections/ViewPage')));
export const CollectionCreatePage = Loadable(lazy(() => import('../pages/collections/CreatePage')));

// Error
export const Error400Page = Loadable(lazy(() => import('../pages/errors/Error400Page')));
export const Error401Page = Loadable(lazy(() => import('../pages/errors/Error401Page')));
export const Error403Page = Loadable(lazy(() => import('../pages/errors/Error403Page')));
export const Error404Page = Loadable(lazy(() => import('../pages/errors/Error404Page')));
export const Error500Page = Loadable(lazy(() => import('../pages/errors/Error500Page')));
