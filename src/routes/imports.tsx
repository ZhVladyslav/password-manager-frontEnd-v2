import React, { Suspense, lazy, ComponentType } from 'react';
import { Loader } from '../components/index';
import ClaimsGuard from '../guards/ClaimsGuard';
import RoleGuard from '../guards/RoleGuard';

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
        <Suspense fallback={<Loader />}>
          <ClaimsGuard claims={claims}>
            <Component {...props} />
          </ClaimsGuard>
        </Suspense>
      );

    if (roles && !claims)
      return (
        <Suspense fallback={<Loader />}>
          <RoleGuard roles={roles}>
            <Component {...props} />
          </RoleGuard>
        </Suspense>
      );

    return (
      <Suspense fallback={<Loader />}>
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
export const MainLayout = Loadable(lazy(() => import('../layouts/Main.layout')));

// Auth
export const LoginPage = Loadable(lazy(() => import('../pages/Login.page')));
export const RegistrationPage = Loadable(lazy(() => import('../pages/Registration.page')));
