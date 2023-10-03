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
    setUserName(state, action) {
      state.name = action.payload;
    },
    
    setUserRole(state, action) {
      state.role = action.payload;
    },
    
    setUserClaims(state, action) {
      state.claims = action.payload;
    },
  },
});

export default slice;
