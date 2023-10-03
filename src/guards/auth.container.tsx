import React, { useCallback, useEffect } from 'react';
import { useSelector } from '../redux/store';
import { ISessionStore, IStore } from '../types/store.type';
import { userSession } from '../auth/userSession';
import { userService } from '../services/user.service';
import { userActions } from '../redux/actions/userActions';
import { roleService } from '../services/role.service';

interface IAuthContainer {
  children: React.ReactNode;
}

export default function AuthContainer(props: IAuthContainer) {
  // get tokens with redux store
  const sessionStore = useSelector((state: IStore) => state.session);

  const userInfo = async () => {
    const myAccountRes = await userService.myAccount();

    if (!myAccountRes) return;

    if (myAccountRes.roleId) {
      const RoleClaimsRes = await roleService.getById({ id: myAccountRes.roleId });
      
      if (RoleClaimsRes) {
        userActions.myAccount({
          name: myAccountRes.name,
          claims: RoleClaimsRes.claims.map((item) => item.claim),
          role: myAccountRes.roleId,
        });
      }
    } else {
      userActions.myAccount({ name: myAccountRes.name, claims: null, role: null });
    }
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
