import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/storeType';

// const
import { PATH_AUTH } from '../../routes/paths';

// components
import Loading from '../../pages/loading/LoadingPage';

// ----------------------------------------------------------------------

interface iAuthGuard {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

export const AuthGuard = (props: iAuthGuard) => {
  // get userIsLoading and accessToken from store
  const isLoading = useSelector((state: IStore) => state.user.isLoading);
  const accessToken = useSelector((state: IStore) => state.session.access);

  // if accessToken is not present, redirect to login page
  if (!accessToken) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {props.children}
    </>
  );
};
