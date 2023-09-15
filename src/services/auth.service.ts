import axios from '../config/axios';
import { API } from '../config/config';
import { IError, IErrorRes } from '../types/error.type';
import { IUser } from '../types/user.type';

interface IResults {
  message: string;
  token: string;
}

interface IRegistration extends Pick<IUser, 'name' | 'login' | 'password'> {}
interface ILogin extends Pick<IUser, 'login' | 'password'> {}

interface IRegistrationResult extends Pick<IResults, 'message'> {}
interface ILoginResult extends Pick<IResults, 'token'> {}

interface IAuthService {
  registration(data: IRegistration): Promise<IRegistrationResult | IError>;
  login(data: ILogin): Promise<ILoginResult | IError>;
}

class AuthService implements IAuthService {
  rootPath: string;

  constructor() {
    this.rootPath = 'auth';
  }

  private path(route: string) {
    return `${API}/${this.rootPath}/${route}`;
  }

  /**
   * registration
   * login
   */

  async registration(data: IRegistration): Promise<IRegistrationResult | IError> {
    try {
      const res = await axios.post<IRegistrationResult>(this.path('registration'), data);
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async login(data: ILogin): Promise<ILoginResult | IError> {
    try {
      const res = await axios.post<ILoginResult>(this.path('login'), data);
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }
}

export const authService = new AuthService();
