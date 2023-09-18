import { createSlice } from '@reduxjs/toolkit';

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
    setLoader(state, action) {
      state.isLoading = action.payload;
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

export default slice;