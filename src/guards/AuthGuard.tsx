import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { PATH_AUTH } from '../routes/paths';
import { IStore } from '../types/storeType';

// ----------------------------------------------------------------------

interface IAuthGuard {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const AuthGuard: React.FC<IAuthGuard> = (props) => {
  const accessToken = useSelector((state: IStore) => state.session.access);

  // if accessToken is not present, redirect to login page
  if (!accessToken) return <Navigate to={PATH_AUTH.login} />;

  return <>{props.children}</>;
};

// ----------------------------------------------------------------------

export default AuthGuard;
