// Login
export interface ILoginReq {
  login: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

// Registration
export interface IRegistrationReq {
  name: string;
  login: string;
  password: string;
}

// Refresh
export interface IRefreshRes {
  accessToken: string;
}
