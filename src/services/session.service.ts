import axios from '../config/axios';
import { API } from '../config/config';
import { IError, IErrorRes } from '../types/error.type';
import { ISession } from '../types/session.type';

interface IMessage {
  message: string;
}

interface IGetById extends Pick<ISession, 'id'> {}
interface IDelete extends Pick<ISession, 'id'> {}

interface ISessionService {
  getAll(): Promise<ISession[] | IError>;
  getById(data: IGetById): Promise<ISession | IError>;
  delete(data: IDelete): Promise<IMessage | IError>;
}

class SessionService implements ISessionService {
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
   */

  async getAll(): Promise<ISession[] | IError> {
    try {
      const res = await axios.get<ISession[]>(this.path('all'));
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async getById(data: IGetById): Promise<ISession | IError> {
    try {
      const res = await axios.get<ISession>(this.path('by-id'), { data });
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async delete(data: IDelete): Promise<IMessage | IError> {
    try {
      const res = await axios.delete<IMessage>(this.path('delete'), { data });
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }
}

export const sessionService = new SessionService();
