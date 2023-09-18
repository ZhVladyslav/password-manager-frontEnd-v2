import { createSlice } from '@reduxjs/toolkit';
import { ISessionStore } from '../../types/store.type';

const initialState: ISessionStore = {
  token: null,
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    deleteToken(state) {
      state.token = null;
    },
  },
});

export default slice;
