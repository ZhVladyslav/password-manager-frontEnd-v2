import { dispatch } from '../store';
import slice from '../slices/sessionSlice';

// ----------------------------------------------------------------------

class SessionActions {
  private setRefresh(token: string) {
    dispatch(slice.actions.setRefresh(token));
  }

  private deleteRefresh() {
    dispatch(slice.actions.deleteRefresh());
  }

  private setAccess(token: string) {
    dispatch(slice.actions.setAccess(token));
  }

  private deleteAccess() {
    dispatch(slice.actions.deleteAccess());
  }

  //
  //
  //

  public login(access: string, refresh: string) {
    this.setAccess(access);
    this.setRefresh(refresh);
  }
  //
  public refresh(refresh: string) {
    this.setAccess(refresh);
  }
  //
  public logout() {
    this.deleteAccess();
    this.deleteRefresh();
  }
}

// ----------------------------------------------------------------------

export const sessionActions = new SessionActions();
