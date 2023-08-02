import React, { useCallback, useEffect } from 'react';
import { ISessionStore, IStore } from '../types/storeType';
import { useSelector } from '../redux/store';
import { jwtAuth } from './jwtAuth';

// ----------------------------------------------------------------------

interface IAuthContainer {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const AuthContainer: React.FC<IAuthContainer> = (props) => {
  // get tokens with redux store
  const token = useSelector((state: IStore) => state.session);

  // init function for auto login if tokens is present
  const initialize = useCallback((token: ISessionStore) => {
    try {
      if (!token.access || !token.refresh) {
        jwtAuth.logout();
        return;
      }

      jwtAuth.setSession(token.access, token.refresh);
    } catch (e) {
      jwtAuth.logout();
    }
  }, []);

  //
  useEffect(() => {
    initialize(token);
  }, [initialize]);

  return <>{props.children}</>;
};

// ----------------------------------------------------------------------

export default AuthContainer;
