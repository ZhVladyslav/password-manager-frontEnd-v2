import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/storeType';

// consts
import { PATH_MAIN } from '../../routes/paths';

// components
import Loading from '../../pages/loading/LoadingPage';

// ----------------------------------------------------------------------

interface iGuestGuard {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

export const GuestGuard = (props: iGuestGuard) => {
  // get userIsLoading and accesToken from store
  const isLoading = useSelector((state: IStore) => state.user.isLoading);
  const accessToken = useSelector((state: IStore) => state.session.access);

  // if accesToken is present, redirect to home page
  if (accessToken) {
    return <Navigate to={PATH_MAIN.home} />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {props.children}
    </>
  );
};
