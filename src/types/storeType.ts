// Store
export interface IStore {
  session: ISessionStore;
  user: IUserStore;
  utils: IUtilsStore;
}

// Session
export interface ISessionStore {
  access: string | null;
  refresh: string | null;
}

// User
export interface IUserStore {
  name: string | null;
  role: string | null;
  claims: string[] | null;
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;
}

// Util
export interface IUtilsStore {
  isLoading: boolean;
  error: string | null;
}