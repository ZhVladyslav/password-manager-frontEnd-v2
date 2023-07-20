// Store
export interface IStore {
  session: ISessionStore;
  user: IUserStore;
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
  isLoading: boolean | null;
  error: string | null;
}
