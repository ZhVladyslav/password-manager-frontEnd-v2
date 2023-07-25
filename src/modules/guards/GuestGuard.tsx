import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/storeType';

// const
import { PATH_COLLECTION } from '../../routes/paths';

// components
import Loading from '../../pages/loading/LoadingPage';

// ----------------------------------------------------------------------

interface iGuestGuard {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

export const GuestGuard = (props: iGuestGuard) => {
  // get userIsLoading and accessToken from store
  const isLoading = useSelector((state: IStore) => state.user.isLoading);
  const accessToken = useSelector((state: IStore) => state.session.access);

  // if accessToken is present, redirect to home page
  if (accessToken) {
    return <Navigate to={PATH_COLLECTION.view} />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {props.children}
    </>
  );
};
