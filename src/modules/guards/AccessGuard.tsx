import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/storeType';

// consts
import { PATH_ERROR } from '../../routes/paths';

// ----------------------------------------------------------------------

interface iAccessGuard {
  children: React.ReactNode;
  claims: string[];
}

// ----------------------------------------------------------------------

export const AccessGuard = (props: iAccessGuard) => {
  // get user role claims from store
  const userClaims = useSelector((state: IStore) => state.user.claims);

  if (!userClaims) return <Navigate to={PATH_ERROR.error403} />;

  // check claims
  for (const item of props.claims) {
    if (!userClaims.includes(item)) {
      return <Navigate to={PATH_ERROR.error403} />;
    }
  }

  return <>{props.children}</>;
};
