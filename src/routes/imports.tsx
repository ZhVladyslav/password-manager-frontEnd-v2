import React, { Suspense, lazy, ComponentType } from 'react';
import LoadingPage from '../pages/Loading.page';
import ClaimsGuard from '../guards/claim.guard';

interface iLoadable {
  claims?: string[] | undefined;
  // eslint-disable-next-line
  [key: string]: any;
}

/* eslint-disable react/display-name */
const Loadable = (Component: ComponentType) => {
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
export const AuthLayout = Loadable(lazy(() => import('../layouts/Auth.layout')));
export const MainLayout = Loadable(lazy(() => import('../layouts/Main.layout')));
export const CollectionLayout = Loadable(lazy(() => import('../layouts/Collection.layout')));

// Home
export const HomePage = Loadable(lazy(() => import('../pages/Home.page')));

// Auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/Login.page')));
export const RegistrationPage = Loadable(lazy(() => import('../pages/auth/Registration.page')));

// User
export const UserViewPage = Loadable(lazy(() => import('../pages/user/View.page')));
export const UserSettingsPage = Loadable(lazy(() => import('../pages/user/Settings.page')));

// Data
export const DataListPage = Loadable(lazy(() => import('../pages/data/List.page')));
export const DataCreatePage = Loadable(lazy(() => import('../pages/data/Create.page')));
export const DataDecryptPage = Loadable(lazy(() => import('../pages/data/Decrypt.page')));
export const DataEditPage = Loadable(lazy(() => import('../pages/data/Edit.page')));
export const DataViewPage = Loadable(lazy(() => import('../pages/data/View.page')));

// Role
export const RoleListPage = Loadable(lazy(() => import('../pages/role/List.page')));
export const RoleEditPage = Loadable(lazy(() => import('../pages/role/Edit.page')));
export const RoleViewPage = Loadable(lazy(() => import('../pages/role/View.page')));

// Errors
export const Error403Page = Loadable(lazy(() => import('../pages/errors/Error403.page')));
export const Error404Page = Loadable(lazy(() => import('../pages/errors/Error404.page')));
export const Error500Page = Loadable(lazy(() => import('../pages/errors/Error500.page')));
