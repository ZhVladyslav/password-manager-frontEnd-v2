import axios from '../config/axios';
import { API } from '../config/config';
import { IError, IErrorRes } from '../types/error.type';
import { IPassCollection } from '../types/passCollection.type';

interface IMessage {
  message: string;
}

interface IGetById extends Pick<IPassCollection, 'id'> {}
interface ICreate extends Pick<IPassCollection, 'name' | 'encryptData'> {}
interface IEditName extends Pick<IPassCollection, 'id' | 'name'> {}
interface IEditEncryptDate extends Pick<IPassCollection, 'id' | 'encryptData'> {}
interface IDelete extends Pick<IPassCollection, 'id'> {}

class PassCollectionService {
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
   * create
   * edit-name
   * edit-encrypt-data
   * delete
   */

  async getAll() {
    try {
      const res = await axios.get<IPassCollection[]>(this.path('all'));
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(data: IGetById) {
    try {
      const res = await axios.get<IPassCollection>(this.path('by-id'), { params: data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async create(data: ICreate) {
    try {
      const res = await axios.post<{ id: string }>(this.path('create'), data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async editName(data: IEditName): Promise<IMessage | IError> {
    try {
      const res = await axios.put<IMessage>(this.path('edit-name'), data);
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async editEncryptData(data: IEditEncryptDate): Promise<IMessage | IError> {
    try {
      const res = await axios.put<IMessage>(this.path('edit-encrypt-data'), data);
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async delete(data: IDelete) {
    try {
      const res = await axios.delete<IMessage>(this.path('delete'), { data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const passCollectionService = new PassCollectionService();
