import { dispatch } from '../store';
import slice from '../slices/sessionSlice';

class SessionActions {
  private setToken(token: string) {
    dispatch(slice.actions.setToken(token));
  }

  private deleteToken() {
    dispatch(slice.actions.deleteToken());
  }

  public login(access: string, refresh: string) {
    this.setToken(access);
  }

  public logout() {
    this.deleteToken();
  }
}

export const sessionActions = new SessionActions();
