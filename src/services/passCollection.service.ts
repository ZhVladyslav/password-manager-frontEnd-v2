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

interface IPassCollectionService {
  getAll(): Promise<IPassCollection[] | IError>;
  getById(data: IGetById): Promise<IPassCollection | IError>;
  create(data: ICreate): Promise<IMessage | IError>;
  editName(data: IEditName): Promise<IMessage | IError>;
  editEncryptData(data: IEditEncryptDate): Promise<IMessage | IError>;
  delete(data: IDelete): Promise<IMessage | IError>;
}

class PassCollectionService implements IPassCollectionService {
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

  async getAll(): Promise<IPassCollection[] | IError> {
    try {
      const res = await axios.get<IPassCollection[]>(this.path('all'));
      return res.data;
    } catch (error) {
      const err = error as IErrorRes;
      return err.response.data;
    }
  }

  async getById(data: IGetById): Promise<IPassCollection | IError> {
    try {
      const res = await axios.get<IPassCollection>(this.path('by-id'), { data });
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

export const passCollectionService = new PassCollectionService();