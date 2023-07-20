import axios from '../modules/axios';
import { API } from '../config/config';
import { IError, IMessageRes } from '../types/helpTypes';
import {
  ICreateCollectionReq,
  IEditInfoCollection,
  IGetAllCollectionsRes,
  IGetCollectionByIdRes,
} from '../types/collectionType';

// ----------------------------------------------------------------------
class CollectionService {
  async getAll() {
    try {
      const res = await axios.get(`${API}/passCollection/All`);
      return { res: res.data as IGetAllCollectionsRes[] };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async getById(id: string) {
    try {
      const res = await axios.get(`${API}/passCollection/${id}`);
      return { res: res.data as IGetCollectionByIdRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async create(data: ICreateCollectionReq) {
    try {
      const res = await axios.post(`${API}/passCollection/create`, data);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async editPasswords(id: string, passwords: string) {
    try {
      const res = await axios.put(`${API}/passCollection/passwords`, { passCollectionId: id, passwords });
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async editInfo(data: IEditInfoCollection) {
    try {
      const res = await axios.put(`${API}/passCollection/info`, data);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async delete(id: string) {
    try {
      const res = await axios.delete(`${API}/passCollection/${id}`);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }
}

// ----------------------------------------------------------------------

export const collectionService = new CollectionService();
