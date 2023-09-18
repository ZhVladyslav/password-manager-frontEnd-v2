// Store
export interface IStore {
  session: ISessionStore;
  user: IUserStore;
  utils: IUtilsStore;
}

// Session
export interface ISessionStore {
  token: string | null;
}

// User
export interface IUserStore {
  name: string | null;
  role: string | null;
  claims: string[] | null;
}

// Util
export interface IUtilsStore {
  isLoading: boolean;
  error: string | null;
}