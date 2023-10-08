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

class RoleService {
  rootPath: string;

  constructor() {
    this.rootPath = 'role';
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

  async getAll() {
    try {
      const res = await axios.get<IRole[]>(this.path('all'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getById(data: IGetById) {
    try {
      const res = await axios.get<IGetByIdRes>(this.path('by-id'), { params: data });
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getByName(data: IGetByName) {
    try {
      const res = await axios.get<IGetByNameRes>(this.path('by-name'), { data });
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getClaims() {
    try {
      const res = await axios.get<string[]>(this.path('claims'));
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async create(data: ICreate) {
    try {
      const res = await axios.post<IMessage>(this.path('create'), data);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async edit(data: IEdit) {
    try {
      const res = await axios.put<IMessage>(this.path('edit'), data);
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

export const roleService = new RoleService();
