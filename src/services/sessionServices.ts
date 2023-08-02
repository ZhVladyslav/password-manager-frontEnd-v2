import axios from '../config/axios'
import { API } from '../config/config';
import { IGetActiveSessionsRes } from '../types/sessionType';
import { IError, IMessageRes } from '../types/helpTypes';

// ----------------------------------------------------------------------
class SessionService {
  async getActives() {
    try {
      const res = await axios.get(`${API}/session/active`);
      return { res: res.data as IGetActiveSessionsRes[] };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async close(id: string) {
    try {
      const res = await axios.post(`${API}/session/close`, { sessionId: id });
      return { res: res.data as IMessageRes[] };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }
}

// ----------------------------------------------------------------------

export const sessionService = new SessionService();
