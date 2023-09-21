import axios from '../config/axios';
import jwtDecode from 'jwt-decode';
import { sessionActions } from '../redux/actions/sessionActions';
import { IUserToken } from '../types/userToken.type';

class UserSession {
  private token: string;
  private expireTimer: NodeJS.Timeout | null;

  constructor() {
    this.token = '';
    this.expireTimer = null;
  }

  private clearTimer() {
    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
      this.expireTimer = null;
    }
  }

  private setTimer() {
    if (this.token === '') return;
    const currentTime = Date.now();

    const tokenDecode = jwtDecode(this.token) as IUserToken;
    const expTokenDate = tokenDecode.exp * 1000;

    if (expTokenDate < currentTime) {
      this.close();
      return;
    }

    const sessionTime = expTokenDate - currentTime;
    this.clearTimer();

    axios.defaults.headers.common.Authorization = this.token;
    sessionActions.create(this.token);

    this.expireTimer = setTimeout(() => {
      this.close();
    }, sessionTime);
  }

  public create(token: string) {
    this.token = token;
    this.setTimer();
  }

  public close() {
    this.clearTimer();
    delete axios.defaults.headers.common.Authorization;
    sessionActions.close();
  }
}

export const userSession = new UserSession();
