interface IGroupPass {
  id: string;
  name: string;
  star: boolean;
  data: string; //to group
}

/* ----------------  Get all user groups res  ---------------- */
export interface IGetAllGroups_Res extends Omit<IGroupPass, 'data'> {}

/* ----------------  Get by id user group res  ---------------- */
export interface IGetByIdGroups_Res extends IGroupPass {}

/* ----------------  Create group res ---------------- */
export interface ICreateGroups_Req extends Pick<IGroupPass, 'name'> {}
export interface ICreateGroups_Res {
  id: string;
  message: string;
}

/* ----------------  Edit info group req  ---------------- */
// export interface IEditGroups_Res extends Omit<IGroupPass, 'data'> {}
