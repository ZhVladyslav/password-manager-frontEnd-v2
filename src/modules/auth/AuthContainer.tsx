import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { ISessionStore, IStore } from '../../types/storeType';
import { setSession } from '../jwt';

// ----------------------------------------------------------------------

interface iAuthContainer {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

export const AuthContainer = (props: iAuthContainer) => {
  // get tokens with redux store
  const token = useSelector((state: IStore) => state.session);

  // init function for auto login if tokens is present
  const initialize = useCallback(async (token: ISessionStore) => {
    try {
      if (!token.access || !token.refresh) {
        sessionActions.logout();
        return;
      }

      setSession(token.access, token.refresh);
    } catch (e) {
      sessionActions.logout();
    }
  }, []);

  //
  useEffect(() => {
    initialize(token);
  }, [initialize]);

  return <>{props.children}</>;
};
