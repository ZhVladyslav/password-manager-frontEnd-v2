import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import userSlice from './slices/userSlice';
import sessionSlice from './slices/sessionSlice';
import utilsSlice from './slices/utilsSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['name', 'role', 'claims', 'sessionId'],
};

const sessionPersistConfig = {
  key: 'session',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['access', 'refresh'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice.reducer),
  session: persistReducer(sessionPersistConfig, sessionSlice.reducer),
  utils: utilsSlice.reducer,
});

// ----------------------------------------------------------------------

export { rootPersistConfig, rootReducer };
