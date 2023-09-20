import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { IStore } from '../types/store.type';
import { routesHome } from '../routes/paths';

interface IGuestGuard {
  children: React.ReactNode;
}

const GuestGuard: React.FC<IGuestGuard> = (props) => {
  const accessToken = useSelector((state: IStore) => state.session.token);

  if (accessToken) return <Navigate to={routesHome.home} />;

  return <>{props.children}</>;
};

export default GuestGuard;
