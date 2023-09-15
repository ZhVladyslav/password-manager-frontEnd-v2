import axios from '../config/axios';
import { API } from '../config/config';
import { IClaim } from '../types/claim.type';
import { IError, IErrorRes } from '../types/error.type';
import { IRole } from '../types/role.type';

interface IMessage {
  message: string;
}

interface IGetById extends Pick<IRole, 'id'> {}
interface IGetByName extends Pick<IRole, 'name_en'> {}
interface ICreate
  extends Pick<IRole, 'name_en' | 'name_ua' | 'name_ru' | 'description_en' | 'description_ua' | 'description_ru'> {
  claims: string[];
}
interface IEdit
  extends Pick<
    IRole,
    'id' | 'name_en' | 'name_ua' | 'name_ru' | 'description_en' | 'description_ua' | 'description_ru'
  > {
  claims: string[];
}
interface IDelete extends Pick<IRole, 'id'> {}

interface IGetByIdRes extends IRole {
  claims: IClaim[];
}
interface IGetByNameRes extends IRole {
  claims: IClaim[];
}

interface IRoleService {
  getAll(): Promise<IRole | IError>;
  getById(date: IGetById): Promise<IGetByIdRes | IError>;
  getByName(date: IGetByName): Promise<IGetByNameRes | IError>;
  getClaims(): Promise<string[] | IError>;
  create(date: ICreate): Promise<IMessage | IError>;
  edit(date: IEdit): Promise<IMessage | IError>;
  delete(date: IDelete): Promise<IMessage | IError>;
}

class RoleService implements IRoleService {
  rootPath: string;

  constructor() {
    this.rootPath = 'pass-collection';
  }

  private path(route: string) {
    return `${API}/${this.rootPath}/${route}`;
  }

  /**
   * all
   * by-id
   * by-name
   * claims
   * create
   * edit
   * delete
   */

  async getAll(): Promise<IRole | IError> {
    try {
      const res = await axios.get<IRole>(this.path('all'));
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async getById(data: IGetById): Promise<IGetByIdRes | IError> {
    try {
      const res = await axios.get<IGetByIdRes>(this.path('by-id'), { data });
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async getByName(data: IGetByName): Promise<IGetByNameRes | IError> {
    try {
      const res = await axios.get<IGetByNameRes>(this.path('by-name'), { data });
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async getClaims(): Promise<string[] | IError> {
    try {
      const res = await axios.get<string[]>(this.path('claims'));
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async create(data: ICreate): Promise<IMessage | IError> {
    try {
      const res = await axios.post<IMessage>(this.path('create'), data);
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async edit(data: IEdit): Promise<IMessage | IError> {
    try {
      const res = await axios.put<IMessage>(this.path('edit'), data);
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

export const roleService = new RoleService();
