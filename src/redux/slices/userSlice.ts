import { createSlice } from '@reduxjs/toolkit';
import { IUserStore } from '../../types/store.type';

const initialState: IUserStore = {
  name: null,
  role: null,
  claims: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload;
    },
  },
});

export default slice;
