import axios from '../modules/axios';
import { API } from '../config/config';
import { IError, IMessageRes } from '../types/helpTypes';
import { ICreateGroups_Req, IGetAllGroups_Res, IGetByIdGroups_Res } from '../types/collectionType';

// ----------------------------------------------------------------------
class CollectionService {
  async getAll() {
    try {
      const res = await axios.get(`${API}/collection/All`);
      return { res: res.data as IGetAllGroups_Res[] };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async getById(id: string) {
    try {
      const res = await axios.get(`${API}/collection/byId/${id}`);
      return { res: res.data as IGetByIdGroups_Res };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async create(data: ICreateGroups_Req) {
    try {
      const res = await axios.post(`${API}/collection/create`, data);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async editData(id: string, data: string) {
    try {
      const res = await axios.put(`${API}/collection/data`, { id, data });
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async editName(id: string, name: string) {
    try {
      const res = await axios.put(`${API}/collection/name`, { id, name });
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async delete(id: string) {
    try {
      const res = await axios.delete(`${API}/collection/${id}`);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }
}

// ----------------------------------------------------------------------

export const collectionService = new CollectionService();
