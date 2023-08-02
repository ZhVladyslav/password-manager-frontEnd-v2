import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { PATH_COLLECTION } from '../routes/paths';
import { IStore } from '../types/storeType';

// ----------------------------------------------------------------------

interface IGuestGuard {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const GuestGuard: React.FC<IGuestGuard> = (props) => {
  const accessToken = useSelector((state: IStore) => state.session.access);

  // if accessToken is present, redirect
  if (accessToken) return <Navigate to={PATH_COLLECTION.view} />;

  return <>{props.children}</>;
};

// ----------------------------------------------------------------------

export default GuestGuard;
