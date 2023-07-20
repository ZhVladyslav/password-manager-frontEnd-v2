import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/storeType';

// consts
import { PATH_ERROR } from '../../routes/paths';

// ----------------------------------------------------------------------

interface iRoleGuard {
  children: React.ReactNode;
  roles: string[];
}

// ----------------------------------------------------------------------

export const RoleGuard = (props: iRoleGuard) => {
  // get user role claims from store
  const userRole = useSelector((state: IStore) => state.user.role);

  if (!userRole) return <Navigate to={PATH_ERROR.error403} />;

  // check role
  if (!props.roles.includes(userRole)) {
    return <Navigate to={PATH_ERROR.error403} />;
  }

  return <>{props.children}</>;
};
