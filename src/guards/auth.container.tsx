import React, { useCallback, useEffect } from 'react';
import { useSelector } from '../redux/store';
import { ISessionStore, IStore } from '../types/store.type';
import { userSession } from '../auth/userSession';
import { userService } from '../services/user.service';
import { userActions } from '../redux/actions/userActions';
import { roleService } from '../services/role.service';
import { sessionActions } from '../redux/actions/sessionActions';
import { roleToUserService } from '../services/roleToUser.service';

interface IAuthContainer {
  children: React.ReactNode;
}

export default function AuthContainer(props: IAuthContainer) {
  // get tokens with redux store
  const sessionStore = useSelector((state: IStore) => state.session);

  const userInfo = async () => {
    const myAccountRes = await userService.myAccount();

    if (!myAccountRes) {
      userActions.logout();
      sessionActions.close();
      userSession.close();
      return;
    }

    const roleToUser = await roleToUserService.getByUserId({ userId: myAccountRes.id });

    if (!roleToUser) {
      userActions.myAccount({ name: myAccountRes.name, claims: null, role: null });
      return;
    }

    const userRole = await roleService.getById({ id: roleToUser.roleId });
    if (!userRole) return;

    userActions.myAccount({
      name: myAccountRes.name,
      claims: userRole.claims.map((item) => item.claim),
      role: roleToUser.roleId,
    });
  };

  // init function for auto login if tokens is present
  const initialize = useCallback((sessionStore: ISessionStore) => {
    if (sessionStore && sessionStore.token) {
      userSession.restoration(sessionStore.token);
      userInfo();
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
