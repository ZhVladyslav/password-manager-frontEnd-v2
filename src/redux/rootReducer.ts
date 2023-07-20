import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import userReducer from './slices/userSlice';
import sessionReducer from './slices/sessionSlice';
import utilsReducer from './slices/utils';

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
  user: persistReducer(userPersistConfig, userReducer),
  session: persistReducer(sessionPersistConfig, sessionReducer),
  utils: utilsReducer,
});

// ----------------------------------------------------------------------

export { rootPersistConfig, rootReducer };
