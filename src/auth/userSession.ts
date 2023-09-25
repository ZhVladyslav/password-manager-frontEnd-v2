import jwtDecode from 'jwt-decode';
import { IUserToken } from '../types/userToken.type';
import axios from '../config/axios';
import { sessionActions } from '../redux/actions/sessionActions';

class UserSession {
  private token: string;
  private expireTimer: NodeJS.Timeout | null;

  constructor() {
    this.token = '';
    this.expireTimer = null;
  }

  public restoration(token: string) {
    if (token === '') return;

    this.token = token;
    axios.defaults.headers.common.Authorization = token;
    this.setTimer();
  }

  public create(token: string) {
    if (token === '') return;

    this.token = token;
    axios.defaults.headers.common.Authorization = token;
    sessionActions.create(token);
    this.setTimer();
  }

  public close() {
    delete axios.defaults.headers.common.Authorization;
    sessionActions.close();

    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
      this.expireTimer = null;
    }
  }

  private setTimer() {
    const currentTime = Date.now();
    const tokenDecode = jwtDecode(this.token) as IUserToken;
    const expTokenDate = tokenDecode.exp * 1000;

    if (expTokenDate < currentTime) {
      this.close();
      return;
    }

    const sessionTime = expTokenDate - currentTime;
    this.expireTimer = setTimeout(() => {
      this.close();
    }, sessionTime);
  }
}

export const userSession = new UserSession();
