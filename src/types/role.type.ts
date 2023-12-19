import { IClaim } from './claim.type';

export interface IRole {
  id: string;
  name_en: string;
  name_ua: string;
  description_en: string;
  description_ua: string;
  createDate: Date;
  lastUpdate: Date;
}

export interface IRoleAndClaims extends IRole {
  claims: IClaim[];
}
