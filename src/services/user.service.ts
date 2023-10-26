import axios from '../config/axios';
import { API } from '../config/config';
import { IError, IErrorRes } from '../types/error.type';
import { IUser } from '../types/user.type';

interface IMessage {
  message: string;
}

interface IEditName extends Pick<IUser, 'name'> {}
interface IEditPassword extends Pick<IUser, 'password'> {
  newPassword: string;
}
interface IDelete extends Pick<IUser, 'password'> {}

class UserService {
  rootPath: string;

  constructor() {
    this.rootPath = 'user';
  }

  private path(route: string) {
    return `${API}/${this.rootPath}/${route}`;
  }

  async myAccount() {
    try {
      const res = await axios.get<IUser>(this.path('my-account'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async editName(data: IEditName) {
    try {
      const res = await axios.put<IMessage>(this.path('edit-name'), data);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async editPassword(data: IEditPassword) {
    try {
      const res = await axios.put<IMessage>(this.path('edit-password'), data);
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

export const userService = new UserService();
