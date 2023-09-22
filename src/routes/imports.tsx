import React, { Suspense, lazy, ComponentType } from 'react';
import LoadingPage from '../pages/Loading.page';
import ClaimsGuard from '../guards/claim.guard';

interface iLoadable {
  claims?: string[] | undefined;
  // eslint-disable-next-line
  [key: string]: any;
}

/* eslint-disable react/display-name */
export const Loadable = (Component: ComponentType) => {
  return ({ claims, ...props }: iLoadable) => {
    if (claims) {
      return (
        <Suspense fallback={<LoadingPage />}>
          <ClaimsGuard claims={claims}>
            <Component {...props} />
          </ClaimsGuard>
        </Suspense>
      );
    }

    return (
      <Suspense fallback={<LoadingPage />}>
        <Component {...props} />
      </Suspense>
    );
  };
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

// Home
export const HomePage = Loadable(lazy(() => import('../pages/Home.page')));

// Errors
export const Error403Page = Loadable(lazy(() => import('../pages/errors/Error403.page')));
export const Error404Page = Loadable(lazy(() => import('../pages/errors/Error404.page')));
export const Error500Page = Loadable(lazy(() => import('../pages/errors/Error500.page')));