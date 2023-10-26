import { IRole } from './role.type';
import { IRoleToUser } from './roleToUser.type';
import { ISession } from './session.type';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  roleId: string | null;
  createDate: Date;
}

interface IUserInfoTemplate {
  user: {
    id: string;
    name: string;
    role_id: string | null;
    createDate: Date;
  };
  roleToUser: null | IRoleToUser;
  role: null | IRole;
}

export interface IUserList extends IUserInfoTemplate {
  sessionsQuantity: number;
}

export interface IUserInfo extends IUserInfoTemplate {
  sessions: ISession[];
}
