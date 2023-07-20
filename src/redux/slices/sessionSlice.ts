import { createSlice } from '@reduxjs/toolkit';
import axios from '../../modules/axios';
import { setSession } from '../../modules/jwt';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  access: null,
  refresh: null,
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setRefresh(state, action) {
      state.refresh = action.payload;
    },
    //
    deleteRefresh(state) {
      state.refresh = null;
    },
    //
    setAccess(state, action) {
      state.access = action.payload;
    },
    //
    deleteAccess(state) {
      state.access = null;
    },
  },
});

// ----------------------------------------------------------------------

class SessionActions {
  private setRefresh(token: string) {
    dispatch(slice.actions.setRefresh(token));
  }
  //
  private deleteRefresh() {
    dispatch(slice.actions.deleteRefresh());
  }
  //
  private setAccess(token: string) {
    dispatch(slice.actions.setAccess(token));
  }
  //
  private deleteAccess() {
    dispatch(slice.actions.deleteAccess());
    delete axios.defaults.headers.common.Authorization;
  }

  //
  //
  //

  public login(access: string, refresh: string) {
    this.setAccess(access);
    this.setRefresh(refresh);
    setSession(access, refresh);
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

export default slice.reducer;
export const sessionActions = new SessionActions();
