import { dispatch } from '../store';
import slice from '../slices/userSlice';

import { IUserStore } from '../../types/storeType';

// ----------------------------------------------------------------------

class UserActions {
  loading(isLoading: boolean) {
    dispatch(slice.actions.setLoader(isLoading));
  }
  //
  loginSuccess(user: IUserStore) {
    dispatch(slice.actions.loginSuccess(user));
  }
  //
  hasError(err: string) {
    dispatch(slice.actions.hasError(err));
  }
}

// ----------------------------------------------------------------------

export const userActions = new UserActions();
