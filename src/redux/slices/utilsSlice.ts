import { createSlice } from '@reduxjs/toolkit';
import { IUtilsStore } from '../../types/store.type';

const initialState: IUtilsStore = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default slice;
