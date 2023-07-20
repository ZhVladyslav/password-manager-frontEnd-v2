// get session
export interface IGetActiveSessionsRes {
  id: string;
  ipV4: string;
  headerUserAgent: string;
  expDate: Date;
  isActive: boolean;
  createDate: Date;
}
