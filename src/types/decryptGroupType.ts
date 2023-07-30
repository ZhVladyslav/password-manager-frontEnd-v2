export interface IDecryptGrout {
  id: string;
  version: string;
  payload: string;
  date: {
    create: number;
    lastEdit: number;
  };
  collectionData: IDecryptGroutRecord[];
}

export interface IDecryptGroutRecord {
  name: string;
  userFields: IUserFields[];
}

export interface IUserFields {
  name: string;
  text: string;
  hidden: boolean;
}