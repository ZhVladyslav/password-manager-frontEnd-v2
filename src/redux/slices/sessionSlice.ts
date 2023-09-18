import { createSlice } from '@reduxjs/toolkit';

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

export default slice;