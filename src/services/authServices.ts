import axios from '../modules/axios';
import { API } from '../config/config';
import { ILoginReq, ILoginRes, IRefreshRes, IRegistrationReq } from '../types/authType';
import { IError, IMessageRes } from '../types/helpTypes';

// ----------------------------------------------------------------------
class AuthService {
  async registration(data: IRegistrationReq) {
    try {
      const res = await axios.post(`${API}/auth/registration`, data);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async login(data: ILoginReq) {
    try {
      const res = await axios.post(`${API}/auth/login`, data);
      return { res: res.data as ILoginRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async refresh(token: string) {
    try {
      const res = await axios.post(`${API}/session/refresh`, { token });
      return { res: res.data as IRefreshRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async logout() {
    try {
      const res = await axios.post(`${API}/session/logout`);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }
}

// ----------------------------------------------------------------------

export const authService = new AuthService();
