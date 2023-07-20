import { createSlice } from '@reduxjs/toolkit';
import { IUserStore } from '../../types/storeType';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  name: null,
  role: null,
  claims: null,
  sessionId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    loginSuccess(state, action) {
      state.isLoading = false;
      state = action.payload;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// ----------------------------------------------------------------------

class UserActions {
  startLoading() {
    dispatch(slice.actions.startLoading());
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

export default slice.reducer;
export const userActions = new UserActions();
