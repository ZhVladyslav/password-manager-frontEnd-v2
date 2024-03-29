import { dispatch } from '../store';
import slice from '../slices/userSlice';

import { IUserStore } from '../../types/store.type';

class UserActions {
  myAccount({ name, role, claims }: IUserStore) {
    dispatch(slice.actions.setUserName(name));
    dispatch(slice.actions.setUserRole(role));
    dispatch(slice.actions.setUserClaims(claims));
  }

  editName(name: string) {
    dispatch(slice.actions.setUserName(name));
  }

  logout() {
    dispatch(slice.actions.logout());
  }
}

export const userActions = new UserActions();
