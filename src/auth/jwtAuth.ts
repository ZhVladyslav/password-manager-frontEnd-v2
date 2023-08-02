import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { sessionActions } from '../redux/actions/sessionActions';
import { authService } from '../services/authServices';
import { IAccessToken } from '../types/authType';

// ----------------------------------------------------------------------

class JwtAuth {
  private accessToken: string;
  private refreshToken: string;
  private expireTimer: NodeJS.Timeout | null;

  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
    this.expireTimer = null;
  }

  //
  //
  //

  private clearExpireTimer() {
    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
      this.expireTimer = null;
    }
  }

  //
  //
  //

  //
  private expire() {
    if (this.accessToken === '') return;
    const currentTime = Date.now();

    const accessDecode = jwtDecode(this.accessToken) as IAccessToken;
    if (!('exp' in accessDecode)) return;
    const expTokenDate = accessDecode.exp * 1000;

    if (expTokenDate < currentTime) {
      this.logout();
      return;
    }

    this.clearExpireTimer();

    axios.defaults.headers.common.Authorization = this.accessToken;
    sessionActions.login(this.accessToken, this.refreshToken);

    const sessionTime = expTokenDate - currentTime;
    this.expireTimer = setTimeout(() => {
      this.refresh();
    }, sessionTime);
  }

  //
  private async refresh() {
    try {
      if (this.refreshToken === '') return;

      const result = await authService.refresh(this.refreshToken);
      if (result.err) throw result.err;

      this.accessToken = result.res.accessToken;

      this.expire();
    } catch (err) {
      console.error(err);
    }
  }

  //
  //
  //

  //
  async login(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;

    this.expire();
  }

  //
  async logout() {
    this.clearExpireTimer();

    if (this.accessToken !== '') await authService.logout();

    delete axios.defaults.headers.common.Authorization;
    sessionActions.logout();
  }

  //
  setSession(access: string, refresh: string) {
    if (access === '' || refresh === '') return;

    this.accessToken = access;
    this.refreshToken = refresh;

    this.expire();
  }
}

// ----------------------------------------------------------------------

export const jwtAuth = new JwtAuth();
