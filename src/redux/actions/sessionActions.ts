import { dispatch } from '../store';
import slice from '../slices/sessionSlice';

class SessionActions {
  public create(token: string) {
    dispatch(slice.actions.setToken(token));
  }

  public close() {
    dispatch(slice.actions.deleteToken());
  }
}

export const sessionActions = new SessionActions();
