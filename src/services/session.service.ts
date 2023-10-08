import axios from '../config/axios';
import { API } from '../config/config';
import { ISession } from '../types/session.type';

interface IMessage {
  message: string;
}

interface IGetById extends Pick<ISession, 'id'> {}
interface IDelete extends Pick<ISession, 'id'> {}

class SessionService {
  rootPath: string;

  constructor() {
    this.rootPath = 'session';
  }

  private path(route: string) {
    return `${API}/${this.rootPath}/${route}`;
  }

  /**
   * all
   * by-id
   * delete
   * logout
   */

  async getAll() {
    try {
      const res = await axios.get<ISession[]>(this.path('all'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getById(data: IGetById) {
    try {
      const res = await axios.get<ISession>(this.path('by-id'), { data });
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      const res = await axios.delete<IMessage>(this.path('logout'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async delete(data: IDelete) {
    try {
      const res = await axios.delete<IMessage>(this.path('delete'), { data });
      return res.data;
    } catch (error) {
      return null;
    }
  }
}

export const sessionService = new SessionService();
