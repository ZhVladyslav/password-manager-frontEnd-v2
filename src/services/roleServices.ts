import axios from '../modules/axios';
import { API } from '../config/config';
import { IError, IMessageRes } from '../types/helpTypes';
import { ICreateRoleReq, IEditRoleReq, IGetAllClaimsRes, IGetAllRolesRes } from '../types/roleType';

// ----------------------------------------------------------------------
class RoleService {
  async getClaims() {
    try {
      const res = await axios.get(`${API}/role/claimsList`);
      return { res: res.data as IGetAllClaimsRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async getAll() {
    try {
      const res = await axios.get(`${API}/role/All`);
      return { res: res.data as IGetAllRolesRes[] };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async create(data: ICreateRoleReq) {
    try {
      const res = await axios.post(`${API}/role/create`, data);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async editPasswords(data: IEditRoleReq) {
    try {
      const res = await axios.put(`${API}/role/edit`, data);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }

  async delete(id: string) {
    try {
      const res = await axios.delete(`${API}/role/delete/${id}`);
      return { res: res.data as IMessageRes };
    } catch (error) {
      const err = error as IError;
      return { err: err.response };
    }
  }
}

// ----------------------------------------------------------------------

export const roleService = new RoleService();
