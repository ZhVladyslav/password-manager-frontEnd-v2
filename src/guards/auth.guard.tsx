import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { routesAuth } from '../routes/paths';
import { IStore } from '../types/store.type';

interface IAuthGuard {
  children: React.ReactNode;
}

export default function AuthGuard(props: IAuthGuard) {
  const accessToken = useSelector((state: IStore) => state.session.token);

  // if accessToken is not present, redirect to login page
  if (!accessToken) return <Navigate to={routesAuth.login} />;

  return <>{props.children}</>;
}
