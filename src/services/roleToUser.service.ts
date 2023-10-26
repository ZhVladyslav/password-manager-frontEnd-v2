import axios from '../config/axios';
import { API } from '../config/config';
import { IRoleToUser } from '../types/roleToUser.type';

interface IMessage {
  message: string;
}

interface IGetById extends Pick<IRoleToUser, 'id'> {}
interface ISet extends Pick<IRoleToUser, 'roleId' | 'userId'> {}
interface IDelete extends Pick<IRoleToUser, 'userId'> {}

class RoleToUserService {
  rootPath: string;

  constructor() {
    this.rootPath = 'role-to-user';
  }

  private path(route: string) {
    return `${API}/${this.rootPath}/${route}`;
  }

  async getAll() {
    try {
      const res = await axios.get<IRoleToUser[]>(this.path('all'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getById(data: IGetById) {
    try {
      const res = await axios.get<IRoleToUser>(this.path('by-id'), { params: data });
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async set(data: ISet) {
    try {
      const res = await axios.post<IMessage>(this.path('set'), data);
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

export const roleToUserService = new RoleToUserService();
