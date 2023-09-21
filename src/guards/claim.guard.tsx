import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { PATH_ERROR } from '../routes/paths';
import { IStore } from '../types/store.type';

interface IClaimsGuard {
  children: React.ReactNode;
  claims: string[];
}

const ClaimsGuard: React.FC<IClaimsGuard> = (props) => {
  // get user role claims from store
  const userClaims = useSelector((state: IStore) => state.user.claims);
  if (!userClaims) return <Navigate to={PATH_ERROR[403]} />;

  // check claims
  for (const item of props.claims) {
    if (!userClaims.includes(item)) {
      return <Navigate to={PATH_ERROR[403]} />;
    }
  }

  return <>{props.children}</>;
};

export default ClaimsGuard;
