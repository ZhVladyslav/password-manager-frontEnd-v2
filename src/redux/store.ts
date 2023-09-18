import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

// config store
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// for saving in localStorage
const persistor = persistStore(store);

// for update state
const { dispatch } = store;

// for get data with state
const useSelector = useAppSelector;

// for get dispatch in components
const useDispatch = () => useAppDispatch();

// ----------------------------------------------------------------------

export { store, persistor, dispatch, useSelector, useDispatch };