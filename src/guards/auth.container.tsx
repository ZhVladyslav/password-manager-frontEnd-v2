import React, { useCallback, useEffect } from 'react';
import { useSelector } from '../redux/store';
import { ISessionStore, IStore } from '../types/store.type';
import { userSession } from '../auth/userSession';

interface IAuthContainer {
  children: React.ReactNode;
}

export default function AuthContainer(props: IAuthContainer) {
  // get tokens with redux store
  const sessionStore = useSelector((state: IStore) => state.session);

  // init function for auto login if tokens is present
  const initialize = useCallback((sessionStore: ISessionStore) => {
    if (sessionStore && sessionStore.token) {
      userSession.restoration(sessionStore.token);
      return;
    }
    userSession.close();
  }, []);

  //
  useEffect(() => {
    initialize(sessionStore);
  }, [initialize]);

  return <>{props.children}</>;
}
