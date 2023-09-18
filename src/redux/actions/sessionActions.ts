import { dispatch } from '../store';
import slice from '../slices/sessionSlice';

class SessionActions {
  private setToken(token: string) {
    dispatch(slice.actions.setToken(token));
  }

  private deleteToken() {
    dispatch(slice.actions.deleteToken());
  }

  public login(token: string) {
    this.setToken(token);
  }

  public logout() {
    this.deleteToken();
  }
}

export const sessionActions = new SessionActions();
