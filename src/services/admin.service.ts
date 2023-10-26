import axios from '../config/axios';
import { API } from '../config/config';
import { IUserInfo, IUserList } from '../types/user.type';

class AdminService {
  rootPath: string;

  constructor() {
    this.rootPath = 'admin';
  }

  private path(route: string) {
    return `${API}/${this.rootPath}/${route}`;
  }

  async userList() {
    try {
      const res = await axios.get<IUserList[]>(this.path('user-list'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getUserById(id: string) {
    try {
      const res = await axios.get<IUserInfo>(this.path('user-info'), { params: { id } });
      return res.data;
    } catch (error) {
      return null;
    }
  }
}

export const adminService = new AdminService();
