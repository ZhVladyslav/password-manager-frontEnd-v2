import React, { useCallback, useEffect } from 'react';
import { useSelector } from '../redux/store';
import { ISessionStore, IStore } from '../types/store.type';
import { userSession } from '../utils/userSession';

interface IAuthContainer {
  children: React.ReactNode;
}

export default function AuthContainer(props: IAuthContainer) {
  // get tokens with redux store
  const sessionStore = useSelector((state: IStore) => state.session);

  // init function for auto login if tokens is present
  const initialize = useCallback((sessionStore: ISessionStore) => {
    try {
      if (!sessionStore || !sessionStore.token) throw new Error('SessionStore or token not found');
      userSession.create(sessionStore.token);
    } catch (error) {
      userSession.close();
    }
  }, []);

  //
  useEffect(() => {
    initialize(sessionStore);
  }, [initialize]);

  return <>{props.children}</>;
}
