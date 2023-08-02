import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { PATH_ERROR } from '../routes/paths';
import { IStore } from '../types/storeType';

// ----------------------------------------------------------------------

interface IRoleGuard {
  children: React.ReactNode;
  roles: string[];
}

// ----------------------------------------------------------------------

const RoleGuard: React.FC<IRoleGuard> = (props) => {
  // get user role claims from store
  const userRole = useSelector((state: IStore) => state.user.role);

  if (!userRole) return <Navigate to={PATH_ERROR.error403} />;

  // check role
  if (!props.roles.includes(userRole)) {
    return <Navigate to={PATH_ERROR.error403} />;
  }

  return <>{props.children}</>;
};

// ----------------------------------------------------------------------

export default RoleGuard;
