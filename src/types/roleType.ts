// get all claims res
export interface IGetAllClaimsRes {
  viewRole: string;
  editRole: string;
  createRole: string;
}

// get all roles res
export interface IGetAllRolesRes {
  id: string;
  name: string;
  claims: string[];
}

// create reol req
export interface ICreateRoleReq {
  name: string;
  claims: string;
}

// edit role req
export interface IEditRoleReq {
  roleId: string;
  name: string;
  statys: boolean;
  claims: string;
}
