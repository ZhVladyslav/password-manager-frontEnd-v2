import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    setLoader(state, action) {
      state.isLoading = action.payload;
    },
  },
});

// ----------------------------------------------------------------------

export default slice;
